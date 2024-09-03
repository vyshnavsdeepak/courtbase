import { kysely } from "@court-base/db";

const backfillMemberIdInAdvocateCase = async () => {
  const members = await kysely
    .selectFrom("OrganizationMembers")
    .select(["userId", "memberId"])
    .execute();

  for (const m of members) {
    await kysely
      .updateTable("AdvocateCase")
      .set({ advocateId: m.memberId })
      .where("advocateId", "=", m.userId)
      .execute();

    await kysely
      .updateTable("CaseImportTask")
      .set({ advocateId: m.memberId })
      .where("advocateId", "=", m.userId)
      .execute();
  }
};

await backfillMemberIdInAdvocateCase();
await kysely.destroy();
console.log("Backfill complete");
process.exit(0);
