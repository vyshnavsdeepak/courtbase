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
      .leftJoin("CaseType", "CaseType.code", "ManualCaseImportTask.caseType")
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
      console.log("importByCaseNumber", input);
      const { districtCourtId, caseNumber } = input;
      const { number, caseTypeId, regYear } = caseNumber;

      try {
        const [districtCourt, caseType] = await Promise.all([
          ctx.kysely
            .selectFrom("DistrictCourt")
            .innerJoin("State", "State.stateCode", "DistrictCourt.stateCode")
            .select([
              "State.highCourtId",
              "State.stateCode",
              "DistrictCourt.districtCode",
              "DistrictCourt.courtCode",
            ])
            .where("DistrictCourt.id", "=", districtCourtId)
            .executeTakeFirstOrThrow(),
          ctx.kysely
            .selectFrom("CaseType")
            .where("id", "=", caseTypeId)
            .select("code")
            .executeTakeFirstOrThrow(),
        ]);

        const highCourtId = districtCourt.highCourtId;
        const caseTypeCode = caseType.code;

        const insertRes = await ctx.kysely
          .insertInto("ManualCaseImportTask")
          .values({
            organizationId: ctx.orgId,
            highCourtId,
            caseType: caseTypeCode,
            number,
            regYear,
            districtCourtId,
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
              districtCode: districtCourt.districtCode,
              stateCode: districtCourt.stateCode,
              courtCode: districtCourt.courtCode,
            },
            identity: {
              orgId: ctx.orgId,
            },
            tracking: {
              caseImportTaskId: insertRes.id,
            },
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (e as Error).message || "An error occurred",
        });
      }
    }),
} satisfies TRPCRouterRecord;
