import type { TRPCRouterRecord } from "@trpc/server";
import { sql } from "kysely";
import { z } from "zod";

import {
  AllCaseRequestSchema,
  AllCaseResponseSchema,
  CaseSchemaExtended,
  CaseUpdateTitleRequestSchema,
} from "../schemas/cases";
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
        .leftJoin("AdvocateCase", "Case.id", "AdvocateCase.caseId")
        .leftJoin("DistrictCourt", "Case.courtId", "DistrictCourt.id")
        .leftJoin("OrganizationMembers", (join) =>
          join
            .onRef(
              "OrganizationMembers.memberId",
              "=",
              "AdvocateCase.advocateId",
            )
            .on("OrganizationMembers.organizationId", "=", orgId),
        )
        .leftJoin("User", "User.id", "OrganizationMembers.userId") // TODO: Remove this join, as name is moved to OrganizationMembers table
        .select([
          "Case.id",
          sql`ARRAY_AGG("User"."name")`.as("advocateNames"), // Aggregate advocate names
          "crn",
          "Case.courtId",
          "DistrictCourt.name as courtName",
          "typeName",
          "number",
          "regYear",
          "title",
          "customTitle",
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
        .groupBy(["Case.id", "DistrictCourt.name"])
        .where("Case.organizationId", "=", orgId)
        .where("Case.dateOfDecision", "is", null)
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
  byCrn: orgProtectedProcedure
    .input(z.object({ crn: z.string() }))
    .query(async ({ ctx, input }) => {
      const { crn } = input;
      const orgId = ctx.orgId;
      const query = ctx.kysely
        .selectFrom("Case")
        .leftJoin("AdvocateCase", "Case.id", "AdvocateCase.caseId")
        .leftJoin("DistrictCourt", "Case.courtId", "DistrictCourt.id")
        .leftJoin("OrganizationMembers", (join) =>
          join
            .onRef(
              "OrganizationMembers.memberId",
              "=",
              "AdvocateCase.advocateId",
            )
            .on("OrganizationMembers.organizationId", "=", orgId),
        )
        .leftJoin("User", "User.id", "OrganizationMembers.userId") // TODO: Remove this join, as name is moved to OrganizationMembers table
        .select([
          "Case.id",
          sql`ARRAY_AGG("User"."name")`.as("advocateNames"), // Aggregate advocate names
          "crn",
          "Case.courtId",
          "DistrictCourt.name as courtName",
          "typeName",
          "number",
          "regYear",
          "title",
          "customTitle",
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
        .groupBy(["Case.id", "DistrictCourt.name"])
        .where("Case.organizationId", "=", orgId)
        .where("Case.crn", "=", crn);
      const queryResponse = await query.executeTakeFirstOrThrow();
      const result = CaseSchemaExtended.parse(queryResponse);
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
  hasOne: orgProtectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.kysely
      .selectFrom("Case")
      .select("id")
      .where("organizationId", "=", ctx.orgId)
      .where("dateOfDecision", "is", null)
      .limit(1)
      .execute()
      .then((res) => res.length > 0)
      .catch((e) => {
        console.error(e);
        throw new Error("Failed to check if case exists. (E-1)");
      });
    return !!result;
  }),
  updateTitle: orgProtectedProcedure
    .input(CaseUpdateTitleRequestSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.kysely
        .updateTable("Case")
        .set("customTitle", input.title)
        .where("crn", "=", input.crn)
        .where("organizationId", "=", ctx.orgId)
        .execute()
        .then(() => {
          return {
            success: true,
            message: "Case title updated successfully.",
          };
        })
        .catch((e) => {
          console.error(e);
          throw new Error("Failed to update case title. (E-1)");
        });
    }),
  history: orgProtectedProcedure
    .input(z.object({ crn: z.string() }))
    .query(async ({ ctx, input }) => {
      const orgId = ctx.orgId;
      const crn = input.crn;

      const result = await ctx.kysely
        .selectFrom("CaseHistoryItem")
        .select(["businessOnDate", "purposeOfHearing", "hearingDate", "notes"])
        .where("organizationId", "=", orgId)
        .where("crn", "=", crn)
        .orderBy("businessOnDate", "desc")
        .execute()
        .catch(() => {
          throw new Error("Failed to fetch case history. (E-1)");
        });

      return result;
    }),
  historyItem: orgProtectedProcedure
    .input(z.object({ crn: z.string(), businessOnDate: z.date() }))
    .query(async ({ ctx, input }) => {
      const orgId = ctx.orgId;
      const crn = input.crn;

      const result = await ctx.kysely
        .selectFrom("CaseHistoryItem")
        .select(["businessOnDate", "purposeOfHearing", "hearingDate", "notes"])
        .where("organizationId", "=", orgId)
        .where("crn", "=", crn)
        .where("businessOnDate", "=", input.businessOnDate)
        .executeTakeFirstOrThrow()
        .catch(() => {
          throw new Error("Failed to fetch case history. (E-1)");
        });

      return result;
    }),
  updateHistoryNote: orgProtectedProcedure
    .input(
      z.object({
        crn: z.string(),
        businessOnDate: z.string().pipe(z.coerce.date()),
        note: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.orgId;
      const { crn, businessOnDate, note } = input;

      return ctx.kysely
        .updateTable("CaseHistoryItem")
        .set("notes", note)
        .where("organizationId", "=", orgId)
        .where("crn", "=", crn)
        .where("businessOnDate", "=", businessOnDate)
        .execute()
        .then(() => {
          return {
            success: true,
            message: "Case history note updated successfully.",
          };
        })
        .catch(() => {
          throw new Error("Failed to update case history note. (E-1)");
        });
    }),
} satisfies TRPCRouterRecord;

export { casesRouter };
