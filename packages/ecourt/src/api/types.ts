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

export const CaseHistoryParamsSchema = z.object({
  cino: z.string(),
});

export type CaseHistoryParams = z.infer<typeof CaseHistoryParamsSchema>;

export const DistrictCourtCaseByCaseNoParamsSchema = z.object({
  state_code: z.string(),
  dist_code: z.string(),
  court_code: z.string(),
  case_type: z.string(),
  case_number: z.string(),
  year: z.string(),
});

export type DistrictCourtCaseByCaseNoParams = z.infer<
  typeof DistrictCourtCaseByCaseNoParamsSchema
>;
