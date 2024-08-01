import type { Codegen } from "@auth/kysely-adapter";
import { KyselyAuth } from "@auth/kysely-adapter";
import { createPool } from "@vercel/postgres";
import { PostgresDialect } from "kysely";

import type { DB } from "../kysely/types";
import { env } from "../env";

export { type DB } from "../kysely/types";

export const kysely = new KyselyAuth<DB, Codegen>({
  dialect: new PostgresDialect({
    pool: createPool({
      connectionString: env.DATABASE_URL,
    }),
  }),
});
