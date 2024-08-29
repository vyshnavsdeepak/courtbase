import type { eCourtAPICallReturn } from "./ecourt";
import { inngest } from "../lib/inngest";
import { ecourtAPI } from "./ecourt";

export interface RefreshEcourtCasesParams {
  data: {
    caseNos: string[];
    dev?: true;
  };
}

export const refreshEcourtCases = inngest.createFunction(
  {
    id: "refresh-ecourt-cases",
  },
  [
    {
      event: "app/refresh-ecourt-cases",
    },
    {
      cron: "0 17 * * *",
    },
  ],
  async ({ event, step, kysely }) => {
    let caseNos: string[];
    if ("cron" in event.data || "dev" in event.data) {
      const records = await kysely.selectFrom("Case").select("crn").execute();
      caseNos = records.map((record) => record.crn);
    } else {
      caseNos = event.data.caseNos;
    }

    const crns = [...new Set(caseNos)];

    const apiResponse = await Promise.all(
      crns.map(async (cino) => {
        const res = await step.invoke(`get/ecourt/refresh-case/${cino}`, {
          function: ecourtAPI,
          data: {
            function: "refresh-case",
            payload: {
              cino,
            },
          },
        });

        const body = res.body as unknown as eCourtAPICallReturn["refresh-case"];

        return body;
      }),
    );

    await step.run("db-update-case-refresh", async () => {
      const updatePromises = apiResponse.map(async (apiResponse) => {
        return kysely
          .updateTable("Case")
          .set({
            nextHearingDate: apiResponse.nextHearingDate,
          })
          .where("crn", "=", apiResponse.crn)
          .execute();
      });
      await Promise.all(updatePromises);
    });

    return {
      event,
      body: apiResponse,
    };
  },
);
