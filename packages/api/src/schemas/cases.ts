import { z } from "zod";

import type { RouterOutputs } from "@court-base/api";
import type { Case } from "@court-base/db/types";

type CaseField = keyof Case;
const CaseAvailableSorts: [CaseField, ...CaseField[]] = ["nextHearingDate"]; // Add any other valid keys here

const zDateSpan = z.enum([
  "today",
  "tomorrow",
  "thisWeek",
  "nextWeek",
  "thisMonth",
  "nextMonth",
]);
export type DateSpan = z.infer<typeof zDateSpan>;

export const AllCaseRequestSchema = z.object({
  // page: z.number().int().positive().default(1),
  // per_page: z.number().int().positive().default(50),
  filters: z
    .object({
      dateSpan: zDateSpan.optional(),
      dateRange: z
        .object({
          startDate: z.date(),
          endDate: z.date(),
        })
        .optional(),
    })
    .optional()
    .refine(
      (filters) => {
        const { dateSpan, dateRange } = filters ?? {};
        return !(dateSpan && dateRange);
      },
      {
        message: "You must provide either dateSpan or dateRange, but not both.",
      },
    ),
  sort: z
    .object({
      field: z.enum(CaseAvailableSorts).optional(), // Use a tuple type to ensure non-empty array
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

const CaseSchema = z.object({
  id: z.string(),
  crn: z.string(),
  courtId: z.string(),
  typeName: z.string(),
  number: z.string(),
  regYear: z.string(),
  title: z.string(),
  petitioner: z.string(),
  respondent: z.string(),
  dateOfDecision: z.date().nullable(),
  nextHearingDate: z.date().nullable(),
  side: z.string(),
  extraPetitioners: z.string().nullable(),
  extraRespondents: z.string().nullable(),
  extraParties: z.string().nullable(),
  updatedAt: z.date().nullable(),
});
// Extend the schema to include fields from AdvocateCase if necessary
export const AllCaseResponseSchema = CaseSchema.extend({
  advocateId: z.string().nullable(),
  advocateName: z.string().nullable(),
  courtName: z.string().nullable(),
});

export type CasesResponseTypeComplete = RouterOutputs["cases"]["all"];
export type CasesResponseType = CasesResponseTypeComplete["data"];
export type CaseResponseType = CasesResponseType[number];
