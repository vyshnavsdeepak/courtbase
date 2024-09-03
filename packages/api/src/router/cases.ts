import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";

import { AllCaseRequestSchema, AllCaseResponseSchema } from "../schemas/cases";
// import type { Case } from "@court-base/db/types";
import { orgProtectedProcedure } from "../trpc";
import { getNextHearingDateFilter } from "../utils/cases-utils";

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
      const nextHearingDate = input.nextHearingDate;

      const query = ctx.kysely
        .selectFrom("Case")
        .innerJoin("AdvocateCase", "Case.id", "AdvocateCase.caseId")
        .innerJoin("Court", "Case.courtId", "Court.id")
        .innerJoin(
          "OrganizationMembers",
          "OrganizationMembers.memberId",
          "AdvocateCase.advocateId",
        )
        .innerJoin("User", "User.id", "OrganizationMembers.userId") // TODO: Remove this join, as name is moved to OrganizationMembers table
        .select([
          "Case.id",
          sql`ARRAY_AGG("User"."name")`.as("advocateNames"), // Aggregate advocate names
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
        .groupBy(["Case.id", "Court.name"])
        .where("Case.organizationId", "=", orgId)
        .$if(typeof nextHearingDate !== "undefined", (query) => {
          if (!nextHearingDate) {
            throw new Error("[Never] Invalid next hearing date");
          }
          const { startDate, endDate } =
            getNextHearingDateFilter(nextHearingDate);
          return query
            .where("nextHearingDate", ">=", startDate)
            .where("nextHearingDate", "<=", endDate ?? startDate);
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
      const queryResponse = await query.execute();
      const result = AllCaseResponseSchema.parse(queryResponse);
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
