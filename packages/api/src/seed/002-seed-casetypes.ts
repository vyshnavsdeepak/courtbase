// import slugify from "slugify";

// import { kysely } from "@court-base/db";

// import { slugifyCaseType, slugifyCourtName } from "../utils/courts-utils";

// const caseTypes = casetypesArr.flatMap(court => court.results);
// // const caseTypes = [...new Map(casetypesArr.flatMap(court => court.results)
// //   .map(caseType => [caseType.id, caseType])).values()];

// const stateSlug = "KL";
// const stateCode = "4";
// const districtCode = "3";

// const courtName = "High Court of Kerala";
// const slug = slugifyCourtName(courtName);
// // const { id: highCourtId } = await kysely
// //   .insertInto("HighCourt")
// //   .values({
// //     id: slug,
// //     name: courtName,
// //   })
// //   .returning("id")
// //   .executeTakeFirstOrThrow();

// // await kysely
// //   .updateTable("State")
// //   .set({
// //     highCourtId,
// //   })
// //   .where("stateCode", "=", "4") // Kerala
// //   .execute();
// // Lakshadweep also shares the same high court of Kerala, similar for Haryana, Punjab, and Dadra and Nagar Haveli.

// console.log(caseTypes);
// console.log("lenght", caseTypes.length);

// export const findDuplicateCaseTypes = (caseTypes: { id: string; name: string; stateCode: string }[]) => {
//   const slugMap: { [key: string]: Set<string> } = {};

//   caseTypes.forEach(({ id, name, stateCode }) => {
//     const slug = slugifyCaseType(stateCode, id, name);
//     if (!slugMap[id]) {
//       slugMap[id] = new Set();
//     }
//     slugMap[id].add(slug);
//   });

//   return Object.entries(slugMap).filter(([_, slugs]) => slugs.size > 1);
// }

// const duplicates = findDuplicateCaseTypes(caseTypes.map(c => ({ id: c.id, name: c.name, stateCode })));
// console.log("duplicates", duplicates);

// const res = await kysely
//   .insertInto("CaseType")
//   .values(
//     caseTypes.map((casetype) => {
//       const id = slugifyCaseType(stateSlug, casetype.id, casetype.name);
//       return {
//         id,
//         label: casetype.name,
//         code: casetype.id,
//         highCourtId: slug,
//       };
//     }),
//   )
//   .onConflict((c)=> c.doNothing())
//   .returning(["id", "label"])
//   .execute();

// console.log("kl-as-indigent-72")
// console.log("in caseTypes", caseTypes.map(c => c.name).includes("AS INDIGENT - APPEAL SUIT (INDIGENT)"))
// console.log("in res", res.map(c => c.label).includes("AS INDIGENT - APPEAL SUIT (INDIGENT)"))

// await Promise.all(casetypesArr.map(async (court) => {
//   const { courtCode, results } = court;
//   const districtCourt = await kysely.selectFrom("DistrictCourt")
//     .select(["id"])
//     .where("stateCode", "=", stateCode)
//     .where("districtCode", "=", districtCode)
//     .where("courtCode", "=", courtCode)
//     .executeTakeFirstOrThrow();

//   await kysely
//     .insertInto("DistrictCourtCaseType")
//     .values(results.map((caseType) => ({
//       districtCourtId: districtCourt.id,
//       caseTypeId: slugifyCaseType(stateSlug, caseType.id, caseType.name),
//     })))
//     .execute();
// }));

// console.log("Case types inserted successfully");
