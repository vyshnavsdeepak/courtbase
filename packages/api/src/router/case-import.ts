import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { isPostgresError } from "@court-base/db";
import { inngest } from "@court-base/event-funnel";

import caseImportDal from "../dal/case-import-dal";
import casesDal from "../dal/cases-dal";
import {
  CreateCaseImportTaskParamsSchema,
  ImportByCaseNumberParamsSchema,
} from "../models";
import { orgProtectedProcedure } from "../trpc";

export const caseImportRouter = {
  create: orgProtectedProcedure
    .input(CreateCaseImportTaskParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const courtComplexIds = input.courtComplexIds;
      const orgId = ctx.orgId;
      const advocateId = input.advocateId;

      const advocate = await ctx.kysely
        .selectFrom("OrganizationMembers")
        .leftJoin("User", "User.id", "OrganizationMembers.userId")
        // TODO: Remove this join, as name is moved to OrganizationMembers table
        .select(["User.name as name"])
        .where("memberId", "=", advocateId)
        .where("organizationId", "=", orgId)
        .executeTakeFirstOrThrow();

      const advocateName = advocate.name;
      if (!advocateName) {
        throw new Error("Advocate name not found. (E-2)");
      }

      const { id: caseImportTaskId } = await ctx.kysely
        .insertInto("CaseImportTask")
        .values({
          organizationId: orgId,
          courtComplexIds: {
            complexes: courtComplexIds,
          },
          advocateId,
          caseStatus: input.status,
          taskStatus: "PENDING",
          created_by: ctx.memberId,
        })
        .returning("id")
        .executeTakeFirstOrThrow()
        .catch((e) => {
          console.error(e);
          throw new Error("Failed to create case import task. (E-3)");
        });

      const event = await inngest
        .send({
          name: "app/import-by-court-complex",
          data: {
            payload: {
              advocateId,
              status: input.status,
              courtComplexIds,
            },
            identity: {
              orgId,
            },
            tracking: {
              caseImportTaskId,
            },
          },
        })
        .catch(() => {
          throw new Error("Failed to queue case import task. (E-1)");
        });

      const taskId = event.ids[0];
      if (!taskId) {
        // one id will always be returned as we are sending one event
        throw new Error("Failed to queue case import task. (E-2)");
      }
    }),
  all: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("CaseImportTask")
      .select(["id", "taskStatus", "caseStatus", "created_at"])
      .execute();
  }),
  cancelImportJob: orgProtectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.kysely
        .selectFrom("ManualCaseImportTask")
        .where("id", "=", input.taskId)
        .where("organizationId", "=", ctx.orgId)
        .select(["id", "importStatus"])
        .executeTakeFirstOrThrow()
        .catch(() => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Task not found",
          });
        });

      if (record.importStatus === "COMPLETED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Task already completed",
        });
      }

      await inngest.send({
        name: "app/case-import-by-case-no/abort",
        data: {
          tracking: {
            caseImportTaskId: input.taskId,
          },
        },
      });

      await ctx.kysely
        .updateTable("ManualCaseImportTask")
        .set({
          importStatus: "FAILED",
        })
        .where("id", "=", input.taskId)
        .execute();
    }),
  importJobsByCaseNumber: orgProtectedProcedure.query(({ ctx }) => {
    return caseImportDal
      .getManualCaseImportJobsQuery(ctx.orgId)
      .select([
        "ManualCaseImportTask.id",
        "CaseType.label as caseType",
        "ManualCaseImportTask.number",
        "ManualCaseImportTask.regYear",
        "DistrictCourt.name as courtName",
        "ManualCaseImportTask.importStatus",
        "ManualCaseImportTask.createdAt",
        "Case.id as caseId",
        "Case.crn as crn",
      ])
      .orderBy("ManualCaseImportTask.createdAt desc")
      .execute();
  }),
  importByCaseNumber: orgProtectedProcedure
    .input(ImportByCaseNumberParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        districtCourt: districtCourtInput,
        caseNumber,
        id: inputId,
      } = input;
      const { number, caseTypeId, regYear } = caseNumber;

      const caseType = await ctx.kysely
        .selectFrom("CaseType")
        .where("id", "=", caseTypeId)
        .select(["code", "label"])
        .executeTakeFirstOrThrow()
        .catch(() => {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Case type not found",
          });
        });

      const courtId = districtCourtInput.courtId;

      const existingCase = await casesDal.getCaseByCaseNo({
        typeName: caseType.label,
        number,
        regYear,
        courtId,
        organizationId: ctx.orgId,
      });

      if (existingCase) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Case already imported.",
        });
      }

      const { courtCode, stateCode, districtCode, complexId } = await ctx.kysely
        .selectFrom("DistrictCourt")
        .select(["stateCode", "complexId", "districtCode", "courtCode"])
        .where("DistrictCourt.id", "=", courtId)
        .executeTakeFirstOrThrow();

      try {
        const caseTypeCode = caseType.code;
        const dbErrorHandler = (e: unknown) => {
          if (isPostgresError(e)) {
            if (e.code === "23505") {
              throw new TRPCError({
                code: "CONFLICT",
                message: "Case already imported.",
              });
            } else if (e.code === "22001") {
              // PostgreSQL error code for value too long for type
              throw new TRPCError({
                code: "BAD_REQUEST",
                message:
                  "Input exceeds the allowed limit. If this is unexpected, please contact support for assistance.",
              });
            }
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Something went wrong in inserting manual case import task", // Never
          });
        };

        let id = inputId;
        if (id) {
          await ctx.kysely
            .updateTable("ManualCaseImportTask")
            .set({
              caseType: caseTypeCode,
              number,
              regYear,
              complexId,
              districtCourtId: courtId,
              importStatus: "PENDING",
              response: null,
            })
            .where("organizationId", "=", ctx.orgId)
            .where("id", "=", id)
            .execute()
            .catch(dbErrorHandler);
        } else {
          id = await ctx.kysely
            .insertInto("ManualCaseImportTask")
            .values({
              organizationId: ctx.orgId,
              caseType: caseTypeCode,
              number,
              regYear,
              complexId,
              districtCourtId: courtId,
              createdBy: ctx.memberId,
            })
            .returning("id")
            .executeTakeFirstOrThrow()
            .then((res) => res.id)
            .catch(dbErrorHandler);
        }

        await inngest.send({
          name: "app/case-import-by-case-no",
          data: {
            payload: {
              caseNumber: {
                typeCode: caseTypeCode,
                number,
                regYear,
              },
              districtCode,
              stateCode,
              courtCode,
            },
            identity: {
              orgId: ctx.orgId,
            },
            tracking: {
              caseImportTaskId: id,
            },
          },
        });

        return {
          importTaskId: id,
        };
      } catch (e) {
        if (e instanceof TRPCError) {
          throw e;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (e as Error).message || "An error occurred",
        });
      }
    }),
  manualCaseImportTaskById: orgProtectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const res = await caseImportDal
        .getManualCaseImportJobsQuery(ctx.orgId)
        .select([
          "ManualCaseImportTask.id",
          "CaseType.id as caseTypeId",
          "ManualCaseImportTask.number",
          "ManualCaseImportTask.regYear",
          "ManualCaseImportTask.importStatus",
          "ManualCaseImportTask.districtCourtId",
          "DistrictCourt.stateCode",
          "DistrictCourt.districtCode",
          "ManualCaseImportTask.complexId",
          "ManualCaseImportTask.createdAt",
          "ManualCaseImportTask.updatedAt",
        ])
        .where("ManualCaseImportTask.id", "=", id)
        .executeTakeFirstOrThrow();

      const ManualCaseImportTaskSchema = z.object({
        id: z.string(),
        caseTypeId: z.string(),
        number: z.string(),
        regYear: z.string(),
        importStatus: z.string(),
        districtCourtId: z.string(),
        stateCode: z.string(),
        districtCode: z.string(),
        complexId: z.string(),
        createdAt: z.date(),
        updatedAt: z.date().nullable(),
      });

      const { data, error } = ManualCaseImportTaskSchema.safeParse(res);

      if (error) {
        const errors = error.errors.map((e) => e.message).join(", ");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to parse manual case import task: ${errors}`,
        });
      }

      return data;
    }),
} satisfies TRPCRouterRecord;
