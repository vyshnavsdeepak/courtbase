import * as z from "zod";

import type { CompleteOrganization } from "./index";
import { RelatedOrganizationModel } from "./index";

export const CaseModel = z.object({
  id: z.string(),
  crn: z.string(),
  title: z.string(),
  description: z.string(),
  created_at: z.date(),
  updatedAt: z.date().nullish(),
  organizationId: z.string(),
});

export interface CompleteCase extends z.infer<typeof CaseModel> {
  Organization: CompleteOrganization;
}

/**
 * RelatedCaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCaseModel: z.ZodSchema<CompleteCase> = z.lazy(() =>
  CaseModel.extend({
    Organization: RelatedOrganizationModel,
  }),
);
