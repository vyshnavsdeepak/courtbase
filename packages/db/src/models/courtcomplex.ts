import * as z from "zod";

import type {
  CompleteCaseImportTask,
  CompleteCourt,
  CompleteDistrict,
} from "./index";
import {
  RelatedCaseImportTaskModel,
  RelatedCourtModel,
  RelatedDistrictModel,
} from "./index";

export const CourtComplexModel = z.object({
  id: z.string(),
  name: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
  created_at: z.date(),
  updatedAt: z.date().nullish(),
});

export interface CompleteCourtComplex
  extends z.infer<typeof CourtComplexModel> {
  district: CompleteDistrict;
  Court: CompleteCourt[];
  CaseImportTask: CompleteCaseImportTask[];
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
      Court: RelatedCourtModel.array(),
      CaseImportTask: RelatedCaseImportTaskModel.array(),
    }),
  );
