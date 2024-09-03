// import { kysely } from "@court-base/db";

// const backfillSlugAsOrgId = async () => {
//   const organizations = await kysely
//     .selectFrom("Organization")
//     .select(["oldId", "slug"])
//     .execute();

//   for (const org of organizations) {
//     await kysely
//       .updateTable("OrganizationMembers")
//       .set({ organizationId: org.slug })
//       .where("organizationId", "=", org.oldId)
//       .execute();

//     await kysely
//       .updateTable("Case")
//       .set({ organizationId: org.slug })
//       .where("organizationId", "=", org.oldId)
//       .execute();

//     await kysely
//       .updateTable("AdvocateCase")
//       .set({ organizationId: org.slug })
//       .where("organizationId", "=", org.oldId)
//       .execute();

//     await kysely
//       .updateTable("CaseImportTask")
//       .set({ organizationId: org.slug })
//       .where("organizationId", "=", org.oldId)
//       .execute();
//   }
// };

// await backfillSlugAsOrgId();
// await kysely.destroy();
// console.log("Backfill complete");
// process.exit(0);
