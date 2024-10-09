import { kysely } from "@court-base/db";

const getManualCaseImportJobsQuery = (orgId: string) => {
  return kysely
    .selectFrom("ManualCaseImportTask")
    .leftJoin(
      "DistrictCourt",
      "DistrictCourt.id",
      "ManualCaseImportTask.districtCourtId",
    )
    .leftJoin("Case", "ManualCaseImportTask.caseId", "Case.id")
    .leftJoin("CaseType", (qb) => {
      return qb
        .onRef("CaseType.code", "=", "ManualCaseImportTask.caseType")
        .onRef("CaseType.complexId", "=", "ManualCaseImportTask.complexId");
    })
    .where("ManualCaseImportTask.organizationId", "=", orgId);
};

const caseImportDal = {
  getManualCaseImportJobsQuery,
};

export default caseImportDal;
