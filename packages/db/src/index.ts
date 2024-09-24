import type { Codegen } from "@auth/kysely-adapter";
import { KyselyAuth } from "@auth/kysely-adapter";
import { neonConfig } from "@neondatabase/serverless";
import { createPool } from "@vercel/postgres";
import { PostgresDialect } from "kysely";
import { NeonDialect } from "kysely-neon";

import type { DB } from "../kysely/types";
import { env } from "../env";

export { type DB } from "../kysely/types";

export const kysely = new KyselyAuth<DB, Codegen>({
  dialect: (() => {
    if (!env.VERCEL_ENV) {
      // Set the WebSocket proxy to work with the local instance
      neonConfig.wsProxy = (host, port) => `${host}:${port}/v1`;
      // Disable all authentication and encryption
      neonConfig.useSecureWebSocket = false;
      neonConfig.pipelineTLS = false;
      neonConfig.pipelineConnect = false;
      return new NeonDialect({
        connectionString: env.DATABASE_URL,
      });
    } else {
      return new PostgresDialect({
        pool: createPool({
          connectionString: env.DATABASE_URL,
        }),
      });
    }
  })(),
});

export function isPostgresError(e: unknown): e is { code: string } {
  return typeof e === "object" && e !== null && "code" in e;
}
