import * as z from "zod";

import type { CompleteUser } from "./index";
import { RelatedUserModel } from "./index";

export const VerifcationTokenModel = z.object({
  token: z.string(),
  expires: z.date(),
  userId: z.string(),
});

export interface CompleteVerifcationToken
  extends z.infer<typeof VerifcationTokenModel> {
  user: CompleteUser;
}

/**
 * RelatedVerifcationTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVerifcationTokenModel: z.ZodSchema<CompleteVerifcationToken> =
  z.lazy(() =>
    VerifcationTokenModel.extend({
      user: RelatedUserModel,
    }),
  );
