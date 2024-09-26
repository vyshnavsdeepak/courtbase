import { z } from "zod";

import type { RouterOutputs } from "@court-base/api";
import type { Case } from "@court-base/db/types";

type CaseField = keyof Case;
const CaseAvailableSorts: [CaseField, ...CaseField[]] = ["nextHearingDate"]; // Add any other valid keys here

export const allowedFilters = ["nextHearingDate"];

export const zNextHearingDateSpan = z.enum([
  "today",
  "tomorrow",
  "thisWeek",
  "nextWeek",
  "thisMonth",
  "nextMonth",
]);

export const zNextHearingDateRange = z.object({
  from: z.string().date(),
  to: z.string().date().optional(),
});

export const zDateSpanOrNextHearingDate = zNextHearingDateSpan.or(
  zNextHearingDateRange,
);
export type DateSpan = z.infer<typeof zNextHearingDateSpan>;
export type NextHearingDate = z.infer<typeof zDateSpanOrNextHearingDate>;

export const AllCaseRequestSchema = z.object({
  // page: z.number().int().positive().default(1),
  // per_page: z.number().int().positive().default(50),
  nextHearingDate: zNextHearingDateSpan.or(zNextHearingDateRange).optional(),
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
  customTitle: z.string().nullable(),
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

// Extend the schema to include fields from AdvocateCase
export const CaseSchemaExtended = CaseSchema.extend({
  advocateNames: z.array(z.string().nullable()),
  courtName: z.string().nullable(),
});

export const AllCaseResponseSchema = CaseSchemaExtended.array();

export type CasesResponseTypeComplete = RouterOutputs["cases"]["all"];
export type CasesResponseType = CasesResponseTypeComplete["data"];
export type CaseResponseType = CasesResponseType[number];

export const CaseUpdateTitleRequestSchema = z.object({
  crn: z.string(),
  title: z.string(),
});

export type CaseHistoryResponse = RouterOutputs["cases"]["history"];

export type CaseImportJobsResponseType =
  RouterOutputs["caseImport"]["importJobsByCaseNumber"];
