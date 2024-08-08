import { z } from "zod";

export const CaseByAdvocateNameParamsSchema = z.object({
  stateCode: z.string(),
  districtCode: z.string(),
  courtCode: z.string(),
  advocate: z.string(),
  status: z.union([z.literal("Pending"), z.literal("Disposed")]),
});

export type CaseByAdvocateNameParams = z.infer<
  typeof CaseByAdvocateNameParamsSchema
>;
