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
      cron: "TZ=Asia/Kolkata 0 21 * * *",
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

        await step.run(`db/update-case/${cino}`, async () => {
          const body =
            res.body as unknown as eCourtAPICallReturn["refresh-case"];
          await kysely
            .updateTable("Case")
            .set({
              nextHearingDate: body.nextHearingDate,
              updatedAt: new Date(),
            })
            .where("crn", "=", cino)
            .execute();
          return body;
        });
      }),
    );

    return {
      event,
      body: apiResponse,
    };
  },
);
