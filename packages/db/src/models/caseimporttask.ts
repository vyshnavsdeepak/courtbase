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

export const CaseImportTaskModel = z.object({
  id: z.string(),
  organizationId: z.string(),
  courtComplexId: z.string(),
  advocateName: z.string(),
  caseStatus: z.string(),
  created_by: z.string(),
  created_at: z.date(),
  updatedAt: z.date().nullish(),
});

export interface CompleteCaseImportTask
  extends z.infer<typeof CaseImportTaskModel> {
  courtComplex: CompleteCourtComplex;
  user: CompleteUser;
  organization: CompleteOrganization;
}

/**
 * RelatedCaseImportTaskModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCaseImportTaskModel: z.ZodSchema<CompleteCaseImportTask> =
  z.lazy(() =>
    CaseImportTaskModel.extend({
      courtComplex: RelatedCourtComplexModel,
      user: RelatedUserModel,
      organization: RelatedOrganizationModel,
    }),
  );
