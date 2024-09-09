import type { eCourtAPICallReturn } from "./ecourt";
import { inngest } from "../lib/inngest";
import { ecourtAPI } from "./ecourt";

/*
const decryptedJson = {
  state_code: '4',
  dist_code: '3',
  court_code: '8',
  language_flag: 'english',
  bilingual_flag: '0',
  case_number: '353',
  case_type: '47',
  year: '2018'
}
*/

export interface ImportCaseByCaseNoParams {
  data: {
    payload: {
      caseNumber: {
        typeCode: string;
        number: string;
        regYear: string;
      };
      districtCode: string;
      stateCode: string;
      courtCode: string;
    };
    identity: {
      orgId: string;
    };
    tracking: {
      caseImportTaskId: string;
    };
  };
}

export const importCaseByCaseNo = inngest.createFunction(
  { id: "case-import-by-case-no" },
  { event: "app/case-import-by-case-no" },
  async ({ event, step, kysely }) => {
    if (!event.id) {
      throw new Error("Missing event id in importCaseByCaseNo");
    }
    const caseImportTaskId = event.data.tracking.caseImportTaskId;

    await step.run("mark-start-case-import-task", async () => {
      await kysely
        .updateTable("ManualCaseImportTask")
        .set("importStatus", "IN_PROGRESS")
        .where("id", "=", caseImportTaskId)
        .execute();
      return true;
    });

    const payload = event.data.payload;

    const { caseNumber, districtCode, stateCode, courtCode } = payload;
    const { typeCode, number, regYear } = caseNumber;

    const apiRes = await step.invoke("get/ecourt/import-case-by-case-no", {
      function: ecourtAPI,
      data: {
        function: "import-case-by-case-no",
        payload: {
          state_code: stateCode,
          dist_code: districtCode,
          court_code: courtCode,
          case_number: number,
          case_type: typeCode,
          year: regYear,
        },
      },
    });

    const caseBody =
      apiRes.body as unknown as eCourtAPICallReturn["import-case-by-case-no"];

    const caseHistoryResp = await step.invoke("get/ecourt/refresh-case", {
      function: ecourtAPI,
      data: {
        function: "refresh-case",
        payload: {
          cino: caseBody.cino,
        },
      },
    });

    const caseHistory =
      caseHistoryResp.body as unknown as eCourtAPICallReturn["refresh-case"];
    const caseObj = caseHistory.case;

    const identity = event.data.identity;

    const { id: courtId } = await kysely
      .selectFrom("DistrictCourt")
      .select("id")
      .where("courtCode", "=", courtCode)
      .where("stateCode", "=", stateCode)
      .where("districtCode", "=", districtCode)
      .executeTakeFirstOrThrow();

    const caseInserted = await step.run("insert-case", async () => {
      return kysely
        .insertInto("Case")
        .values({
          crn: caseObj.crn,
          courtId,
          typeName: caseObj.caseNo.typeName,
          number: caseObj.caseNo.number.toString(),
          regYear: caseObj.caseNo.year.toString(),
          title: caseObj.title,
          petitioner: caseObj.petitioner,
          petitionerLawyers: caseObj.petitionerLawyers,
          respondent: caseObj.respondent,
          respondentLawyers: caseObj.respondentLawyers,
          dateOfDecision: caseObj.dateOfDecision
            ? new Date(caseObj.dateOfDecision)
            : null,
          side: "UNKNOWN",
          nextHearingDate: caseObj.nextHearingDate,
          // Unlike import by advocate, we setting next hearing date here,
          // thus we are updating updatedAt column as well
          rawData: caseObj.rawData,
          organizationId: identity.orgId,
          updatedAt: new Date(),
        })
        .returning("id")
        .executeTakeFirstOrThrow();
    });

    await step.run("mark-end-case-import-task", async () => {
      await kysely
        .updateTable("ManualCaseImportTask")
        .set("importStatus", "COMPLETED")
        .set("caseId", caseInserted.id)
        .set("response", caseBody)
        .where("id", "=", caseImportTaskId)
        .execute();
      return true;
    });

    return { event, body: apiRes.body };
  },
);
