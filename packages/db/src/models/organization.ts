import * as z from "zod";

import type { CompleteCase } from "./index";
import { RelatedCaseModel } from "./index";

export const OrganizationModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface CompleteOrganization
  extends z.infer<typeof OrganizationModel> {
  cases: CompleteCase[];
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
    }),
  );
