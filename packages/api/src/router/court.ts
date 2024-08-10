import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { CreateCaseImportTaskParamsSchema } from "../models";
import { orgProtectedProcedure } from "../trpc";

export const courtRouter = {
  states: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("State")
      .select(["stateCode", "name"])
      .execute();
  }),
  districts: orgProtectedProcedure
    .input(z.object({ stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("District")
        .select(["districtCode", "name"])
        .where("stateCode", "=", input.stateCode)
        .execute();
    }),
  getCourtComplexes: orgProtectedProcedure
    .input(z.object({ districtCode: z.string(), stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("CourtComplex")
        .select(["id", "name"])
        .where("stateCode", "=", input.stateCode)
        .where("districtCode", "=", input.districtCode)
        .execute();
    }),
  createCaseImportTask: orgProtectedProcedure
    .input(CreateCaseImportTaskParamsSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.kysely
        .insertInto("CaseImportTask")
        .values(
          input.courtComplexIds.map((courtComplexId) => ({
            organizationId: ctx.orgId,
            courtComplexId,
            advocateName: input.advocate,
            caseStatus: input.status,
            created_by: ctx.session.user.id,
          })),
        )
        .execute();
    }),
} satisfies TRPCRouterRecord;
