import type { AdvocateCaseSideType } from "@court-base/db/models";
import type { CaseByAdvocateNameParams } from "@court-base/ecourt/types";

import type { eCourtAPICallReturn } from "./ecourt";
import { inngest } from "../lib/inngest";
import { ecourtAPI } from "./ecourt";

export interface ImportByCourtComplexParams {
  data: {
    payload: {
      advocateId: string;
      status: CaseByAdvocateNameParams["status"];
      courtComplexIds: string[];
    };
    identity: {
      orgId: string;
    };
  };
}

export const importCaseByCourtComplex = inngest.createFunction(
  { id: "case-import-by-court-complex" },
  { event: "app/import-by-court-complex" },
  async ({ event, step, kysely }) => {
    if (!event.id) {
      throw new Error("Missing event id in importCaseByCourtComplex");
    }
    const eventId = event.id;

    await step.run("mark-start-case-import-task", () => {
      return kysely
        .updateTable("CaseImportTask")
        .set("taskStatus", "IN_PROGRESS")
        .where("id", "=", eventId)
        .execute();
    });

    const payload = event.data.payload;
    const identity = event.data.identity;
    const [courts, advocate] = await Promise.all([
      kysely
        .selectFrom("Court")
        .select(["id", "courtCode", "stateCode", "districtCode"])
        .where("complexId", "in", payload.courtComplexIds)
        .execute(),
      kysely
        .selectFrom("User")
        .select("name")
        .where("id", "=", payload.advocateId)
        .executeTakeFirstOrThrow(),
    ]);

    let advocateName = advocate.name;
    if (!advocateName) {
      throw new Error("Advocate name not set");
    }

    // for debug
    if (advocateName === "Vyshnav S Deepak") {
      console.log("[DEBUG] Changing advocate name to Deepak Madathil");
      advocateName = "Deepak Madathil";
    }

    const apiResPromise = courts.map(async (court) => {
      const courtCode = court.courtCode;
      const stateCode = court.stateCode;
      const districtCode = court.districtCode;
      const courtId = court.id;

      const res = await step.invoke(`get/ecourt/import-by-court/${court.id}`, {
        function: ecourtAPI,
        data: {
          function: "import-by-court",
          payload: {
            advocate: advocateName,
            status: payload.status,
            courtCode: court.courtCode,
            stateCode: court.stateCode,
            districtCode: court.districtCode,
          },
        },
      });

      const resBody = res.body as eCourtAPICallReturn["import-by-court"];

      return {
        event: res.event,
        cases: resBody.caseNos,
        court: {
          courtCode,
          stateCode,
          districtCode,
          courtId,
        },
      };
    });

    const result = await Promise.all(apiResPromise);

    const allCases = result.flatMap((r) =>
      r.cases.map((c) => ({ ...c, court: r.court })),
    );
    const mainCases = allCases.filter((c) => !c.rawData.extra_party);

    const casesWithExtraParty = allCases.filter((c) => c.rawData.extra_party);
    const caseToExtraPartyMap = casesWithExtraParty.reduce((acc, c) => {
      const crn = c.crn;
      const extraParty = c.rawData.extra_party;
      acc.set(crn, [...(acc.get(crn) ?? []), extraParty]);
      return acc;
    }, new Map<string, string[]>());

    // find side of our party
    const caseWithOurSide = mainCases.map(
      (
        c,
      ): typeof c & {
        side: AdvocateCaseSideType;
        extraPetitioners?: string | null;
        extraRespondents?: string | null;
        extraParties?: string | null;
      } => {
        const extraParties = caseToExtraPartyMap.get(c.crn)?.join(", ") ?? null;
        const petitionerLawyer = c.petitionerLawyers.toLowerCase();
        const respondentLawyer = c.respondentLawyers.toLowerCase();

        if (petitionerLawyer.includes(advocateName)) {
          return { ...c, side: "PETITIONER", extraPetitioners: extraParties };
        }

        if (respondentLawyer.includes(advocateName)) {
          return { ...c, side: "RESPONDENT", extraRespondents: extraParties };
        }

        return { ...c, side: "UNKNOWN", extraParties };
      },
    );

    const dbSaveResult = await step.run("save-case-to-db", async () => {
      return kysely
        .insertInto("Case")
        .values(
          caseWithOurSide.map((c) => ({
            crn: c.crn,
            courtId: c.court.courtId,
            typeName: c.caseNo.typeName,
            number: c.caseNo.number.toString(),
            regYear: c.caseNo.year.toString(),
            title: c.title,
            petitioner: c.petitioner,
            petitionerLawyers: c.petitionerLawyers,
            respondent: c.respondent,
            respondentLawyers: c.respondentLawyers,
            dateOfDecision: c.dateOfDecision
              ? new Date(c.dateOfDecision)
              : null,
            side: c.side,
            extraPetitioners: c.extraPetitioners,
            extraRespondents: c.extraRespondents,
            extraParties: c.extraParties,
            rawData: c.rawData,
            organizationId: identity.orgId,
          })),
        )
        .onConflict((conflict) =>
          conflict.columns(["crn", "organizationId"]).doUpdateSet((eb) => ({
            updatedAt: new Date(),
            petitioner: eb.ref("excluded.petitioner"),
            petitionerLawyers: eb.ref("excluded.petitionerLawyers"),
            respondent: eb.ref("excluded.respondent"),
            respondentLawyers: eb.ref("excluded.respondentLawyers"),
            extraPetitioners: eb.ref("excluded.extraPetitioners"),
            extraRespondents: eb.ref("excluded.extraRespondents"),
            extraParties: eb.ref("excluded.extraParties"),
            rawData: eb.ref("excluded.rawData"),
          })),
        )
        .returning("id")
        .execute();
    });

    await step.run("link-saved-cases-to-advocate", () => {
      return kysely
        .insertInto("AdvocateCase")
        .values(
          dbSaveResult.map(({ id }) => ({
            advocateId: payload.advocateId,
            caseId: id,
            organizationId: identity.orgId,
          })),
        )
        .onConflict((c) => c.doNothing())
        .execute();
    });

    await step.run("mark-complete-case-import-task", () => {
      return kysely
        .updateTable("CaseImportTask")
        .set("taskStatus", "COMPLETED")
        .where("id", "=", eventId)
        .execute();
    });

    await step.sendEvent("fetch-next-hearing-dates", {
      name: "app/refresh-ecourt-cases",
      data: {
        caseNos: allCases.map((c) => c.crn),
      },
    });
    return { event, body: allCases };
  },
);

export const importCaseByCourtComplexOnCron = inngest.createFunction(
  {
    id: "case-import-by-court-complex-on-cron",
  },
  {
    // every day 5:30 AM IST
    cron: "TZ=Asia/Kolkata 0 30 5 * * *",
  },
  async ({ step, kysely }) => {
    const caseImportTasks = await step.run("get-case-import-tasks", () => {
      return kysely
        .selectFrom("CaseImportTask")
        .select([
          "id",
          "advocateId",
          "courtComplexIds",
          "caseStatus",
          "organizationId",
        ])
        .execute();
    });

    await Promise.all(
      caseImportTasks.map(async (task) => {
        const complexIdsJson = task.courtComplexIds as {
          complexes?: string[];
        } | null;
        if (!complexIdsJson || !("complexes" in complexIdsJson)) {
          console.warn(`Invalid courtComplexIds for task ${task.id}`);
          return; // Skip this task
        }
        const courtComplexIds = complexIdsJson.complexes;
        if (!courtComplexIds || courtComplexIds.length === 0) {
          console.warn(`No court complex IDs found for task ${task.id}`);
          return; // Skip this task
        }
        await step.sendEvent(`cron/event/case-import-task/${task.id}`, {
          name: "app/import-by-court-complex",
          data: {
            payload: {
              advocateId: task.advocateId,
              status: task.caseStatus as CaseByAdvocateNameParams["status"],
              courtComplexIds: courtComplexIds,
            },
            identity: {
              orgId: task.organizationId,
            },
          },
        });
      }),
    );
  },
);
