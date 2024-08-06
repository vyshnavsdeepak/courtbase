import * as z from "zod";

import type { CompleteDistrict } from "./index";
import { RelatedDistrictModel } from "./index";

export const CourtComplexModel = z.object({
  id: z.string(),
  name: z.string(),
  courtCodes: z.string().array(),
  stateCode: z.string(),
  districtCode: z.string(),
  created_at: z.date(),
  updatedAt: z.date().nullish(),
});

export interface CompleteCourtComplex
  extends z.infer<typeof CourtComplexModel> {
  district: CompleteDistrict;
}

/**
 * RelatedCourtComplexModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourtComplexModel: z.ZodSchema<CompleteCourtComplex> =
  z.lazy(() =>
    CourtComplexModel.extend({
      district: RelatedDistrictModel,
    }),
  );
