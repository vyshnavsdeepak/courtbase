import type { TRPCRouterRecord } from "@trpc/server";
import type { z } from "zod";

import type { AllCaseResponseSchema } from "../schemas/cases";
import { AllCaseRequestSchema } from "../schemas/cases";
import { getDateRangeFilter } from "../services/cases-service";
// import type { Case } from "@court-base/db/types";
import { orgProtectedProcedure } from "../trpc";

// type CaseField = keyof Case;
// const CaseAvailableSorts: [CaseField, ...CaseField[]] = [
//   "nextHearingDate",
// ]; // Add any other valid keys here

const casesRouter = {
  all: orgProtectedProcedure
    .input(AllCaseRequestSchema)
    .query(async ({ ctx, input }) => {
      const {
        // page, per_page, filters,
        sort,
      } = input;
      const orgId = ctx.orgId;
      // const limit = per_page;
      // const offset = (page - 1) * limit;
      const dateSpan = input.filters?.dateSpan;
      const query = ctx.kysely
        .selectFrom("Case")
        .leftJoin("AdvocateCase", "Case.id", "AdvocateCase.caseId")
        .leftJoin("Court", "Case.courtId", "Court.id")
        .leftJoin("User", "AdvocateCase.advocateId", "User.id")
        .select([
          "Case.id",
          "AdvocateCase.advocateId as advocateId",
          "User.name as advocateName",
          "crn",
          "Case.courtId",
          "Court.name as courtName",
          "typeName",
          "number",
          "regYear",
          "title",
          "petitioner",
          "respondent",
          "dateOfDecision",
          "nextHearingDate",
          "side",
          "extraPetitioners",
          "extraRespondents",
          "extraParties",
          "Case.updatedAt as updatedAt",
        ])
        .where("Case.organizationId", "=", orgId)
        .$if(typeof dateSpan !== "undefined", (query) => {
          if (!dateSpan) {
            throw new Error("[Never]Invalid date span");
          }
          const { startDate, endDate } = getDateRangeFilter(dateSpan);
          return query
            .where("nextHearingDate", ">=", startDate.toDate())
            .where("nextHearingDate", "<=", endDate.toDate());
        })
        .orderBy("nextHearingDate", "asc")
        .$if(typeof sort?.field !== "undefined", (query) => {
          if (!sort?.field) {
            throw new Error("Invalid sort field or direction");
          }
          return query.orderBy(sort.field, sort.direction);
        });
      // .limit(limit)
      // .offset(offset);

      // const pageCount = await ctx.kysely
      //   .selectFrom("Case")
      //   .select((eb) => eb.fn.count("id").as("count"))
      //   .where("organizationId", "=", orgId)
      //   .executeTakeFirstOrThrow()
      //   .catch((e) => {
      //     console.error(e);
      //     throw new Error("Failed to count cases. (E-1)");
      //   });

      // https://github.com/kysely-org/kysely/issues/1115
      // Then, use this schema to validate the result of your query
      const result: z.infer<typeof AllCaseResponseSchema>[] =
        await query.execute();
      return {
        data: result,
      };
    }),
  count: orgProtectedProcedure.query(async ({ ctx }) => {
    const orgId = ctx.orgId;

    const result = await ctx.kysely
      .selectFrom("Case")
      .select((eb) => eb.fn.count("id").as("count"))
      .where("organizationId", "=", orgId)
      .executeTakeFirstOrThrow()
      .catch((e) => {
        console.error(e);
        throw new Error("Failed to count cases. (E-1)");
      });

    return result.count as number;
  }),
} satisfies TRPCRouterRecord;

export { casesRouter };
