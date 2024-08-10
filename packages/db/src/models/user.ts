import * as z from "zod";

import type {
  CompleteAccount,
  CompleteCaseImportTask,
  CompleteSession,
} from "./index";
import {
  RelatedAccountModel,
  RelatedCaseImportTaskModel,
  RelatedSessionModel,
} from "./index";

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  account: CompleteAccount[];
  session: CompleteSession[];
  CaseImportTask: CompleteCaseImportTask[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    account: RelatedAccountModel.array(),
    session: RelatedSessionModel.array(),
    CaseImportTask: RelatedCaseImportTaskModel.array(),
  }),
);
