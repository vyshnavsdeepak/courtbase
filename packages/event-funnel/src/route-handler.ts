import { serve } from "inngest/next";

import {
  importCaseByCourtComplex,
  importCaseByCourtComplexOnCron,
} from "./functions/case-import";
import { importCaseByCaseNo } from "./functions/case-import-by-case-no";
import { ecourtAPI } from "./functions/ecourt";
import { helloWorld } from "./functions/hello-world";
import { refreshEcourtCases } from "./functions/refresh-ecourt-cases";
import { inngest } from "./lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    ecourtAPI,
    importCaseByCaseNo,
    importCaseByCourtComplex,
    importCaseByCourtComplexOnCron,
    refreshEcourtCases,
  ],
});
