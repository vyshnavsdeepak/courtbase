import { z } from "zod";

import { OrganizationModel } from "@court-base/db/models";

export const OrganizationCreateModel = OrganizationModel.pick({
  name: true,
  slug: true,
}).extend({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(255, "Name must be at most 255 characters long"),
  slug: z
    .string()
    .min(3, "URL must be at least 3 characters long")
    .max(255, "URL must be at most 255 characters long"),
});
