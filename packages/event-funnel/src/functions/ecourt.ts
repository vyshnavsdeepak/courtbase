import { getCasesByAdvocateName } from "@court-base/ecourt/caseByAdvocate";

import { inngest } from "../lib/inngest";

export interface eCourtAPICallParams {
  data:
    | {
        function: "import-by-court";
        payload: Parameters<typeof getCasesByAdvocateName>[0];
      }
    | {
        function: "refresh-case";
        payload: {
          crnNo: string;
        };
      };
}

export const ecourtAPI = inngest.createFunction(
  {
    id: "ecourt-api",
    throttle: {
      limit: 2,
      period: "1s",
      burst: 5,
    },
  },
  { event: "ecourt/api-call" },
  async ({ event }) => {
    const { data } = event;
    if (data.function === "import-by-court") {
      const result = await getCasesByAdvocateName(data.payload);
      return { event, body: result };
    }
  },
);
