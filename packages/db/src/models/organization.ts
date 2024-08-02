import * as z from "zod";

import type { CompleteCase, CompleteUser } from "./index";
import { RelatedCaseModel, RelatedUserModel } from "./index";

export const OrganizationModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export interface CompleteOrganization
  extends z.infer<typeof OrganizationModel> {
  users: CompleteUser[];
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
      users: RelatedUserModel.array(),
      cases: RelatedCaseModel.array(),
    }),
  );
