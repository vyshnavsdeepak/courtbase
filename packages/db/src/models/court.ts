import * as z from "zod";

import type { CompleteCourtComplex, CompleteDistrict } from "./index";
import { RelatedCourtComplexModel, RelatedDistrictModel } from "./index";

export const CourtModel = z.object({
  id: z.string(),
  courtCode: z.string(),
  name: z.string(),
  complexId: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
});

export interface CompleteCourt extends z.infer<typeof CourtModel> {
  district: CompleteDistrict;
  complex: CompleteCourtComplex;
}

/**
 * RelatedCourtModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourtModel: z.ZodSchema<CompleteCourt> = z.lazy(() =>
  CourtModel.extend({
    district: RelatedDistrictModel,
    complex: RelatedCourtComplexModel,
  }),
);
