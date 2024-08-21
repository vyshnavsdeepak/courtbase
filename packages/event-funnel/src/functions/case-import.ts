import type { AdvocateCaseSide } from "@court-base/db/enums";
import type { CaseByAdvocateNameParams } from "@court-base/ecourt/types";

import { inngest } from "../lib/inngest";
import { ecourtAPI } from "./ecourt";

export interface ImportByCourtComplexParams {
  data: {
    payload: {
      advocate: string;
      status: CaseByAdvocateNameParams["status"];
      courtComplexIds: string[];
    };
    identity: {
      userId: string;
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
    const courts = await kysely
      .selectFrom("Court")
      .select(["id", "courtCode", "stateCode", "districtCode"])
      .where("complexId", "in", payload.courtComplexIds)
      .execute();

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
            advocate: payload.advocate,
            status: payload.status,
            courtCode: court.courtCode,
            stateCode: court.stateCode,
            districtCode: court.districtCode,
          },
        },
      });

      return {
        event: res.event,
        cases: res.body.caseNos,
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
        side: AdvocateCaseSide;
        extraPetitioners?: string | null;
        extraRespondents?: string | null;
        extraParties?: string | null;
      } => {
        const extraParties = caseToExtraPartyMap.get(c.crn)?.join(", ") ?? null;

        const advocateName = payload.advocate.toLowerCase();
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

    const dbSaveResult = await step.run("save-case-to-db", () => {
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
        .returning("id")
        .execute();
    });

    await step.run("link-saved-cases-to-advocate", () => {
      return kysely
        .insertInto("AdvocateCase")
        .values(
          dbSaveResult.map(({ id }) => ({
            advocateId: identity.userId, // TODO: modify this after we have advocateId
            caseId: id,
            organizationId: identity.orgId,
          })),
        )
        .execute();
    });

    await step.run("mark-complete-case-import-task", () => {
      return kysely
        .updateTable("CaseImportTask")
        .set("taskStatus", "COMPLETED")
        .where("id", "=", eventId)
        .execute();
    });
    return { event, body: allCases };
  },
);
