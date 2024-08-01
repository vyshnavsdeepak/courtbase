import * as z from "zod";

export const VerificationTokenModel = z.object({
  token: z.string(),
  identifier: z.string(),
  expires: z.date(),
});
