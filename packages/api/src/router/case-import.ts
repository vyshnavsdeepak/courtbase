import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { inngest } from "@court-base/event-funnel";

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
  importJobsByCaseNumber: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("ManualCaseImportTask")
      .leftJoin(
        "DistrictCourt",
        "DistrictCourt.id",
        "ManualCaseImportTask.districtCourtId",
      )
      .innerJoin("CaseType", (qb) => {
        return qb
          .onRef("CaseType.code", "=", "ManualCaseImportTask.caseType")
          .onRef("CaseType.complexId", "=", "ManualCaseImportTask.complexId");
      })
      .select([
        "ManualCaseImportTask.id",
        "CaseType.label as caseType",
        "ManualCaseImportTask.number",
        "ManualCaseImportTask.regYear",
        "DistrictCourt.name as courtName",
        "ManualCaseImportTask.importStatus",
        "ManualCaseImportTask.createdAt",
      ])
      .where("organizationId", "=", ctx.orgId)
      .orderBy("ManualCaseImportTask.createdAt desc")
      .execute();
  }),
  importByCaseNumber: orgProtectedProcedure
    .input(ImportByCaseNumberParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const { districtCourt: districtCourtInput, caseNumber } = input;
      const { number, caseTypeId, regYear } = caseNumber;

      let courtCode: string;
      let stateCode: string;
      let districtCode: string;
      let complexId: string;

      if (districtCourtInput.courtId) {
        const court = await ctx.kysely
          .selectFrom("DistrictCourt")
          .select(["stateCode", "complexId", "districtCode", "courtCode"])
          .where("DistrictCourt.id", "=", districtCourtInput.courtId)
          .executeTakeFirstOrThrow();
        courtCode = court.courtCode;
        stateCode = court.stateCode;
        districtCode = court.districtCode;
        complexId = court.complexId;
      } else {
        const complex = await ctx.kysely
          .selectFrom("CourtComplex")
          .select([
            "masterComplexCourtCode as courtCode",
            "districtCode",
            "stateCode",
          ])
          .where("id", "=", districtCourtInput.complexId)
          .where("isMasterCourtComplex", "=", true)
          .executeTakeFirstOrThrow()
          .catch(() => {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Complex not found",
            });
          });
        if (!complex.courtCode) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "E1-Something went wrong in finding court complex", // Never
          });
        }
        complexId = districtCourtInput.complexId;
        courtCode = complex.courtCode;
        stateCode = complex.stateCode;
        districtCode = complex.districtCode;
      }

      try {
        const caseType = await ctx.kysely
          .selectFrom("CaseType")
          .where("id", "=", caseTypeId)
          .select("code")
          .executeTakeFirstOrThrow();
        const caseTypeCode = caseType.code;

        const insertRes = await ctx.kysely
          .insertInto("ManualCaseImportTask")
          .values({
            organizationId: ctx.orgId,
            caseType: caseTypeCode,
            number,
            regYear,
            complexId,
            districtCourtId: districtCourtInput.courtId,
            createdBy: ctx.memberId,
          })
          .returning("id")
          .executeTakeFirstOrThrow();

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
              caseImportTaskId: insertRes.id,
            },
          },
        });

        return {
          importTaskId: insertRes.id,
        };
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (e as Error).message || "An error occurred",
        });
      }
    }),
} satisfies TRPCRouterRecord;
