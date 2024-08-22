import { OrgDesignation, OrgRole } from "@prisma/client";
import * as z from "zod";

import type { CompleteAdvocateCase } from "./index";
import { RelatedAdvocateCaseModel } from "./index";

export const OrganizationMembersModel = z.object({
  organizationId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(OrgRole),
  designation: z.nativeEnum(OrgDesignation).nullish(),
});

export interface CompleteOrganizationMembers
  extends z.infer<typeof OrganizationMembersModel> {
  AdvocateCase: CompleteAdvocateCase[];
}

/**
 * RelatedOrganizationMembersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationMembersModel: z.ZodSchema<CompleteOrganizationMembers> =
  z.lazy(() =>
    OrganizationMembersModel.extend({
      AdvocateCase: RelatedAdvocateCaseModel.array(),
    }),
  );
