import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { orgProtectedProcedure } from "../trpc";

export const courtRouter = {
  states: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("State")
      .select(["stateCode", "name", "highCourtId"])
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
  districtCourts: orgProtectedProcedure
    .input(z.object({ districtCode: z.string(), stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("DistrictCourt")
        .select(["id", "name"])
        .where("stateCode", "=", input.stateCode)
        .where("districtCode", "=", input.districtCode)
        .execute();
    }),
  getCaseTypes: orgProtectedProcedure
    .input(z.object({ highCourtId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("CaseType")
        .select(["id", "label"])
        .where("highCourtId", "=", input.highCourtId)
        .execute();
    }),
} satisfies TRPCRouterRecord;
