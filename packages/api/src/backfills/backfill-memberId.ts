import { generateMemberId } from "@court-base/api/utils/user-utils";
import { kysely } from "@court-base/db";

const backfillMemberId = async () => {
  const members = await kysely
    .selectFrom("OrganizationMembers")
    .leftJoin("User", "OrganizationMembers.userId", "User.id")
    .select(["OrganizationMembers.userId", "User.name"])
    .execute();

  for (const member of members) {
    if (!member.name) {
      continue;
    }
    const memberId = generateMemberId(member.name);
    await kysely
      .updateTable("OrganizationMembers")
      .set({ memberId })
      .where("userId", "=", member.userId)
      .execute();
  }
};

await backfillMemberId();
await kysely.destroy();
console.log("Backfill complete");
process.exit(0);
