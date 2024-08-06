import * as z from "zod";

import type { CompleteDistrict } from "./index";
import { RelatedDistrictModel } from "./index";

export const StateModel = z.object({
  stateCode: z.string(),
  name: z.string(),
});

export interface CompleteState extends z.infer<typeof StateModel> {
  District: CompleteDistrict[];
}

/**
 * RelatedStateModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStateModel: z.ZodSchema<CompleteState> = z.lazy(() =>
  StateModel.extend({
    District: RelatedDistrictModel.array(),
  }),
);
