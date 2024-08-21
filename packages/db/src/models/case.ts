import { AdvocateCaseSide } from "@prisma/client";
import * as z from "zod";

import type { CompleteCourt, CompleteOrganization } from "./index";
import { RelatedCourtModel, RelatedOrganizationModel } from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const CaseModel = z.object({
  id: z.string(),
  crn: z.string(),
  courtId: z.string(),
  typeName: z.string(),
  number: z.string(),
  regYear: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  petitioner: z.string(),
  petitionerLawyers: z.string(),
  respondent: z.string(),
  respondentLawyers: z.string(),
  dateOfDecision: z.date().nullish(),
  nextHearingDate: z.date().nullish(),
  side: z.nativeEnum(AdvocateCaseSide),
  extraPetitioners: z.string().nullish(),
  extraRespondents: z.string().nullish(),
  extraParties: z.string().nullish(),
  rawData: jsonSchema,
  created_at: z.date(),
  updatedAt: z.date().nullish(),
  organizationId: z.string(),
});

export interface CompleteCase extends z.infer<typeof CaseModel> {
  Organization: CompleteOrganization;
  Court: CompleteCourt;
}

/**
 * RelatedCaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCaseModel: z.ZodSchema<CompleteCase> = z.lazy(() =>
  CaseModel.extend({
    Organization: RelatedOrganizationModel,
    Court: RelatedCourtModel,
  }),
);
