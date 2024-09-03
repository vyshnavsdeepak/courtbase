import { z } from "zod";

import { OrganizationSchema, OrgRoleSchema } from "@court-base/db/models";

export const OrganizationCreateModel = OrganizationSchema.pick({
  name: true,
  id: true,
}).extend({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(255, "Name must be at most 255 characters long"),
  id: z
    .string()
    .min(3, "URL must be at least 3 characters long")
    .max(255, "URL must be at most 255 characters long"),
});

export const MemberRole = OrgRoleSchema;

export const CreateCaseImportTaskParamsSchema = z.object({
  courtComplexIds: z.array(z.string(), {
    message: "Please select at least one court complex",
  }),
  advocateId: z.string({
    message: "Please enter the advocate name",
  }),
  status: z.union([z.literal("Pending"), z.literal("Disposed")]),
});
