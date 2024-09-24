import type { CaseHistoryLog } from "@court-base/ecourt/types";
import { kysely } from "@court-base/db";

export default async function insertHistory(
  data: CaseHistoryLog,
  crn: string,
  orgIds: string[],
) {
  if (!data.length) {
    return;
  }
  const historyUpsertParams = data.map((item) => ({
    crn,
    businessOnDate: item.businessOnDate,
    purposeOfHearing: item.purposeOfHearing,
    hearingDate: item.hearingDate ?? null,
  }));
  const historyUpsertParamsForAllOrgs = orgIds.flatMap((orgId) =>
    historyUpsertParams.map((params) => ({
      ...params,
      organizationId: orgId,
    })),
  );

  await kysely
    .insertInto("CaseHistoryItem")
    .values(historyUpsertParamsForAllOrgs)
    .onConflict((oc) => oc.doNothing())
    .execute();

  return true;
}
