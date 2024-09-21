import { kysely } from "@court-base/db";

import { slugifyCaseType } from "../utils/courts-utils";

const updateCaseTypeIds = async () => {
  const caseTypes = await kysely
    .selectFrom("CaseType")
    .select(["id", "code", "CaseType.label"])
    .execute();
  const stateSlug = "kl";
  for (const caseType of caseTypes) {
    const newId = slugifyCaseType(stateSlug, caseType.code, caseType.label);
    console.log(`Updating CaseType ID: ${caseType.id} -> ${newId}`);
    await kysely
      .updateTable("CaseType")
      .set({ id: newId })
      .where("id", "=", caseType.id)
      .execute();
  }
};

await updateCaseTypeIds();
console.log("CaseType IDs updated");
