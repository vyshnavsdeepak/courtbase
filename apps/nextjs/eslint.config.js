import baseConfig, { restrictEnvAccess } from "@court-base/eslint-config/base";
import nextjsConfig from "@court-base/eslint-config/nextjs";
import reactConfig from "@court-base/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
