import baseConfig, { restrictEnvAccess } from "@court-base/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [
      "dist/**",
      "kysely/types.ts",
      "kysely/enums.ts",
      "src/models/index.ts",
    ],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
