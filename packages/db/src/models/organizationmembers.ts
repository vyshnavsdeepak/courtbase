import * as z from "zod";

export const OrganizationMembersModel = z.object({
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
});
