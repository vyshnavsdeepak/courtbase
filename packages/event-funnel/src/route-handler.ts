import { serve } from "inngest/next";

import { importCaseByCourtComplex } from "./functions/case-import";
import { ecourtAPI } from "./functions/ecourt";
import { helloWorld } from "./functions/hello-world";
import { refreshEcourtCases } from "./functions/refresh-ecourt-cases";
import { inngest } from "./lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    ecourtAPI,
    importCaseByCourtComplex,
    refreshEcourtCases,
  ],
});
