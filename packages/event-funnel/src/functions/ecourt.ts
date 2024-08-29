import { getCasesByAdvocateName } from "@court-base/ecourt/caseByAdvocate";
import { getCaseHistory } from "@court-base/ecourt/caseHistory";

import { inngest } from "../lib/inngest";

type ImportByCourtParams = Parameters<typeof getCasesByAdvocateName>[0];
type ImportByCourtReturn = Awaited<ReturnType<typeof getCasesByAdvocateName>>;

type RefreshCaseParams = Parameters<typeof getCaseHistory>[0];
type RefreshCaseReturn = Awaited<ReturnType<typeof getCaseHistory>>;

export interface eCourtAPICallParams {
  data:
    | {
        function: "import-by-court";
        payload: ImportByCourtParams;
      }
    | {
        function: "refresh-case";
        payload: RefreshCaseParams;
      };
}

export interface eCourtAPICallReturn {
  "import-by-court": ImportByCourtReturn;
  "refresh-case": RefreshCaseReturn;
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
    } else {
      // if (data.function === "refresh-case") {
      const refreshResult: eCourtAPICallReturn["refresh-case"] =
        await getCaseHistory(data.payload);
      return { event, body: refreshResult };
      // }
    }
  },
);
