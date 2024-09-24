import type { eCourtAPICallReturn } from "./ecourt";
import insertHistory from "../actions/cases/insertHistory";
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
      const records = await kysely
        .selectFrom("Case")
        .select("crn")
        .where("dateOfDecision", "is", null)
        .execute();
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
        const orgs = await step.run(`db/update-case/${cino}`, async () => {
          const caseUpdates = await kysely
            .updateTable("Case")
            .set({
              nextHearingDate: body.case.nextHearingDate,
              updatedAt: new Date(),
            })
            .where("crn", "=", cino)
            .returning(["organizationId"])
            .execute();

          return caseUpdates.map((update) => update.organizationId);
        });

        // Set history of case hearing to all orgs who are subscribed to this case in isolation
        const historyOfCaseHearing = body.case.caseHistoryLog;
        await step.run(`db/insert-case-history/${cino}`, async () => {
          return insertHistory(historyOfCaseHearing, cino, orgs);
        });
      }),
    );

    return {
      event,
      body: apiResponse,
    };
  },
);
