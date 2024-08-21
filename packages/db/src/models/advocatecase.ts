import * as z from "zod";

import type { CompleteOrganizationMembers } from "./index";
import { RelatedOrganizationMembersModel } from "./index";

export const AdvocateCaseModel = z.object({
  id: z.string(),
  caseId: z.string(),
  advocateId: z.string(),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export interface CompleteAdvocateCase
  extends z.infer<typeof AdvocateCaseModel> {
  Advocate: CompleteOrganizationMembers;
}

/**
 * RelatedAdvocateCaseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAdvocateCaseModel: z.ZodSchema<CompleteAdvocateCase> =
  z.lazy(() =>
    AdvocateCaseModel.extend({
      Advocate: RelatedOrganizationMembersModel,
    }),
  );
