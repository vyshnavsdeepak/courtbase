import * as z from "zod";

import type { CompleteCase, CompleteCaseImportTask } from "./index";
import { RelatedCaseImportTaskModel, RelatedCaseModel } from "./index";

export const OrganizationModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface CompleteOrganization
  extends z.infer<typeof OrganizationModel> {
  cases: CompleteCase[];
  CaseImportTask: CompleteCaseImportTask[];
}

/**
 * RelatedOrganizationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationModel: z.ZodSchema<CompleteOrganization> =
  z.lazy(() =>
    OrganizationModel.extend({
      cases: RelatedCaseModel.array(),
      CaseImportTask: RelatedCaseImportTaskModel.array(),
    }),
  );
