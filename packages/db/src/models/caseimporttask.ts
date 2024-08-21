import { CaseImportTaskStatus } from "@prisma/client";
import * as z from "zod";

import type {
  CompleteCourtComplex,
  CompleteOrganization,
  CompleteUser,
} from "./index";
import {
  RelatedCourtComplexModel,
  RelatedOrganizationModel,
  RelatedUserModel,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const CaseImportTaskModel = z.object({
  id: z.string(),
  organizationId: z.string(),
  courtComplexIds: jsonSchema,
  advocateName: z.string(),
  caseStatus: z.string(),
  taskStatus: z.nativeEnum(CaseImportTaskStatus),
  taskMeta: jsonSchema,
  created_by: z.string(),
  created_at: z.date(),
  updatedAt: z.date().nullish(),
  courtComplexId: z.string().nullish(),
});

export interface CompleteCaseImportTask
  extends z.infer<typeof CaseImportTaskModel> {
  user: CompleteUser;
  organization: CompleteOrganization;
  CourtComplex?: CompleteCourtComplex | null;
}

/**
 * RelatedCaseImportTaskModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCaseImportTaskModel: z.ZodSchema<CompleteCaseImportTask> =
  z.lazy(() =>
    CaseImportTaskModel.extend({
      user: RelatedUserModel,
      organization: RelatedOrganizationModel,
      CourtComplex: RelatedCourtComplexModel.nullish(),
    }),
  );
