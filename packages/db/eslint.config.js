import baseConfig, { restrictEnvAccess } from "@court-base/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "kysely/types.ts"],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
