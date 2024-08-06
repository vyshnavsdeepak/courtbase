import * as z from "zod";

import type { CompleteCourtComplex, CompleteState } from "./index";
import { RelatedCourtComplexModel, RelatedStateModel } from "./index";

export const DistrictModel = z.object({
  name: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
});

export interface CompleteDistrict extends z.infer<typeof DistrictModel> {
  state: CompleteState;
  CourtComplex: CompleteCourtComplex[];
}

/**
 * RelatedDistrictModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDistrictModel: z.ZodSchema<CompleteDistrict> = z.lazy(() =>
  DistrictModel.extend({
    state: RelatedStateModel,
    CourtComplex: RelatedCourtComplexModel.array(),
  }),
);
