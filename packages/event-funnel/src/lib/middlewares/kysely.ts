import { InngestMiddleware } from "inngest";

import { kysely } from "@court-base/db";

export const kyselyMiddleware = new InngestMiddleware({
  name: "Kysely Middleware",
  init() {
    return {
      onFunctionRun() {
        return {
          transformInput() {
            return {
              ctx: {
                kysely,
              },
            };
          },
        };
      },
    };
  },
});
