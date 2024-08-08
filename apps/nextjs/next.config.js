import { fileURLToPath } from "url";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@court-base/api",
    "@court-base/auth",
    "@court-base/db",
    "@court-base/ui",
    "@court-base/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: "/x/:workspace",
        destination: "/x/:workspace/cases/all",
        permanent: true,
      },
      {
        source: "/x/:workspace/cases",
        destination: "/x/:workspace/cases/all",
        permanent: true,
      },
    ];
  },
};

export default config;
