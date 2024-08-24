import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { Case } from "@court-base/db/types";

import { orgProtectedProcedure } from "../trpc";

type CaseField = keyof Case;
const CaseAvailableSorts: [CaseField, ...CaseField[]] = [
  "id",
  "nextHearingDate",
]; // Add any other valid keys here

const AllCaseRequestSchema = z.object({
  offset: z.number().default(0),
  limit: z.number().default(100),
  filters: z
    .object({
      advocateId: z.string().optional(),
    })
    .optional(),
  sort: z
    .object({
      field: z.enum(CaseAvailableSorts).optional(), // Use a tuple type to ensure non-empty array
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export const casesRouter = {
  all: orgProtectedProcedure
    .input(AllCaseRequestSchema)
    .query(({ ctx, input }) => {
      const { offset, limit, filters, sort } = input;
      const orgId = ctx.orgId;

      const query = ctx.kysely
        .selectFrom("Case")
        .selectAll()
        .where("organizationId", "=", orgId)
        .$if(typeof filters?.advocateId !== "undefined", (query) => {
          if (!filters?.advocateId) {
            throw new Error("Invalid advocateId");
          }
          return query
            .innerJoin("AdvocateCase", "Case.id", "AdvocateCase.caseId")
            .where("AdvocateCase.advocateId", "=", filters.advocateId);
        })
        .$if(typeof sort?.field !== "undefined", (query) => {
          if (!sort?.field) {
            throw new Error("Invalid sort field or direction");
          }
          return query.orderBy(sort.field, sort.direction);
        })
        .limit(limit)
        .offset(offset)
        .execute();

      return query;
    }),
} satisfies TRPCRouterRecord;
