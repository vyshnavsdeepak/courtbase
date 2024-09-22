import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

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
  districtCourts: orgProtectedProcedure
    .input(z.object({ districtCode: z.string(), stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const complexes = await ctx.kysely
        .selectFrom("CourtComplex")
        .select([
          "id",
          "name",
          "isMasterCourtComplex",
          "masterComplexCourtCode",
        ])
        .where("stateCode", "=", input.stateCode)
        .where("districtCode", "=", input.districtCode)
        .execute();

      const complexIds = complexes.map((complex) => complex.id);
      const courts = await ctx.kysely
        .selectFrom("DistrictCourt")
        .select(["id", "name", "complexId"])
        .where("complexId", "in", complexIds)
        .execute();

      const courtsByComplexId = courts.reduce((acc, court) => {
        acc.set(
          court.complexId,
          (acc.get(court.complexId) ?? []).concat(court),
        );
        return acc;
      }, new Map<string, (typeof courts)[number][]>());

      return complexes.map((complex) => ({
        ...complex,
        courts: courtsByComplexId.get(complex.id) ?? [],
      }));
    }),
  getCaseTypes: orgProtectedProcedure
    .input(z.object({ complexId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("CaseType")
        .select(["id", "label"])
        .where("complexId", "=", input.complexId)
        .execute();
    }),
} satisfies TRPCRouterRecord;
