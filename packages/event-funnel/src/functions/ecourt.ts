import { getCasesByAdvocateName } from "@court-base/ecourt/caseByAdvocate";
import { getCaseByCaseNo } from "@court-base/ecourt/caseByCaseNo";
import { getCaseHistory } from "@court-base/ecourt/caseHistory";

import { inngest } from "../lib/inngest";

type ImportByCourtParams = Parameters<typeof getCasesByAdvocateName>[0];
type ImportByCourtReturn = Awaited<ReturnType<typeof getCasesByAdvocateName>>;

type RefreshCaseParams = Parameters<typeof getCaseHistory>[0];
type RefreshCaseReturn = Awaited<ReturnType<typeof getCaseHistory>>;

type ImportCaseByCaseNoParams = Parameters<typeof getCaseByCaseNo>[0];
type ImportCaseByCaseNoReturn = Awaited<ReturnType<typeof getCaseByCaseNo>>;

export interface eCourtAPICallParams {
  data:
    | {
        function: "import-by-court";
        payload: ImportByCourtParams;
      }
    | {
        function: "refresh-case";
        payload: RefreshCaseParams;
      }
    | {
        function: "import-case-by-case-no";
        payload: ImportCaseByCaseNoParams;
      };
}

export interface eCourtAPICallReturn {
  "import-by-court": ImportByCourtReturn;
  "refresh-case": RefreshCaseReturn;
  "import-case-by-case-no": ImportCaseByCaseNoReturn;
}

export const ecourtAPI = inngest.createFunction(
  {
    id: "ecourt-api",
    throttle: {
      limit: 2,
      period: "2s",
      burst: 5,
    },
  },
  [{ event: "ecourt/api-call" }],
  async ({ event }) => {
    const { data } = event;

    if (data.function === "import-by-court") {
      const importResult: eCourtAPICallReturn["import-by-court"] =
        await getCasesByAdvocateName(data.payload);
      return { event, body: importResult };
    } else if (data.function === "refresh-case") {
      const refreshResult: eCourtAPICallReturn["refresh-case"] =
        await getCaseHistory(data.payload);
      return { event, body: refreshResult };
    } else {
      // if (data.function === "import-case-by-case-no") {
      const importCaseByCaseNoResult: eCourtAPICallReturn["import-case-by-case-no"] =
        await getCaseByCaseNo(data.payload);
      return { event, body: importCaseByCaseNoResult };
    }
  },
);
