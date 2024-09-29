// import fs from "fs";
// import path from "path";

// import { kysely } from "@court-base/db";
// import { getCaseTypes } from "@court-base/ecourt/caseTypes";
// import { getCourtComplexes } from "@court-base/ecourt/courtComplexes";
// import { getDistricts } from "@court-base/ecourt/districts";
// import { getStates } from "@court-base/ecourt/states";

// import {
//   slugifyCaseType,
//   slugifyCourtComplex,
//   slugifyCourtName,
// } from "../utils/courts-utils";

// // const subfolderName = "generateSeedDataFiles3";
// // const fullpath = path.join(import.meta.dirname, subfolderName);
// // const fullpath = "/Users/vyshnav/src/github.com/PaintermanLab/ecourts-data/all-courts-data"
// const fullpath =
//   "/Users/vyshnav/src/github.com/PaintermanLab/ecourts-data/courts-data-by-state/kerala";

// // await kysely.deleteFrom("CaseImportTask").execute();
// // await kysely.deleteFrom("ManualCaseImportTask").execute();
// // await kysely.deleteFrom("Case").execute();
// // await kysely.deleteFrom("CaseType").execute();
// // await kysely.deleteFrom("DistrictCourt").execute();
// // await kysely.deleteFrom("CourtComplex").execute();
// // await kysely.deleteFrom("District").execute();
// // await kysely.deleteFrom("State").execute();
// // console.log("All data deleted")

// // let globalCounter = 0;
// const executeLimit = async <T>(
//   fn: () => Promise<T>,
//   fallback: T,
//   timePeriod = 800,
// ): Promise<Awaited<T>> => {
//   const filePath = path.join(fullpath, "lastRun.json");
//   if (fs.existsSync(filePath)) {
//     const lastRun = JSON.parse(fs.readFileSync(filePath, "utf-8")) as number;
//     if (Date.now() - lastRun < timePeriod) {
//       await new Promise((resolve) => setTimeout(resolve, timePeriod));
//     }
//   }

//   let attempts = 0;
//   let data = fallback;
//   const maxAttempts = 3;
//   while (attempts < maxAttempts) {
//     try {
//       // if (globalCounter % 10 === 0) {
//       //   // wait for 3 seconds after every 10 requests
//       //   console.log("Waiting for 3 seconds");
//       //   await new Promise(resolve => setTimeout(resolve, 3000));
//       // }
//       // globalCounter++;
//       data = await fn();
//       break; // Exit the loop if successful
//     } catch (error) {
//       attempts++;
//       console.error(`Attempt ${attempts}: ${error.message}`);
//       const ratelimitError = ["ECONNRESET", "socket hang up"];
//       if (
//         error instanceof Error &&
//         ratelimitError.filter((errorMsg) => error.message.includes(errorMsg))
//           .length === 0
//       ) {
//         console.log("breaking Not a rate limit error");
//         break; // Exit the loop if not a rate limit error
//       }
//       await new Promise((resolve) => setTimeout(resolve, 3000 * attempts)); // Increase timeout for each attempt
//     }
//   }
//   if (attempts === maxAttempts) {
//     return Promise.resolve(data);
//   }
//   fs.writeFileSync(filePath, JSON.stringify(Date.now(), null, 2));
//   return Promise.resolve(data);
// };

// const cachedGet = async <T>(
//   key: string,
//   fn: () => Promise<T>,
//   fallback: T,
//   invalidateCache = false,
// ): Promise<T> => {
//   const safeKey = key.replace(/[^a-z0-9]/gi, "_");
//   const filePath = path.join(fullpath, safeKey + ".json");
//   let parsed: T | null = null;
//   if (fs.existsSync(filePath) && !invalidateCache) {
//     // console.log(`Fetching ${key} from cache`);
//     parsed = JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
//   }

//   // Refetch if empty array
//   // if (!parsed || (Array.isArray(parsed) && parsed.length === 0)) {
//   //   // empty array retry
//   //   console.log(`Retrying ${key} from cache: got []`);
//   //   parsed = await executeLimit(fn, fallback, 500); // optional timelimit
//   //   fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));
//   //   console.log(`Wrote ${key} to cache with length ${parsed}`);
//   //   return parsed;
//   // }

//   if (parsed) {
//     return parsed;
//   }

//   const data = await executeLimit(fn, fallback, 500); // optional timelimit

//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//   return data;
// };

// const states = (await cachedGet("states", getStates, [])).filter(
//   (state) => state.name === "Kerala",
// );

// if (states.length === 0) {
//   throw new Error("No states found");
// }

// const allDistricts: {
//   state: string;
//   stateNumericCode: number;
//   name: string;
//   numericCode: number;
// }[] = [];
// for (const [index, state] of states.entries()) {
//   console.log(
//     `Fetching districts for state ${state.name} (${index + 1} of ${states.length})`,
//   );
//   const districts = await cachedGet(
//     `districts-of-state-${state.name}`,
//     () => getDistricts(state.numericCode.toString()),
//     [],
//   );

//   if (districts.length === 0) {
//     throw new Error(`No districts found for state ${state.name}`);
//   }

//   const districtsWithState = districts.map((district) => ({
//     ...district,
//     state: state.name,
//     stateNumericCode: state.numericCode,
//   }));

//   allDistricts.push(...districtsWithState);
// }

// // Sequentially fetch court complexes
// const allCourtComplexes: {
//   district: string;
//   districtCode: number;
//   state: string;
//   stateCode: number;
//   courtComplexes: {
//     code: number;
//     name: string;
//     courts: {
//       name: string;
//       dbName: string;
//       nationalCourtCode: string;
//       code: number;
//     }[];
//     isMasterCourtComplex: boolean;
//     masterComplexCourtCode: number;
//   }[];
// }[] = [];
// for (const [index, district] of allDistricts.entries()) {
//   console.log(
//     `Fetching court complexes for district ${district.name} (${index + 1} of ${allDistricts.length})`,
//   );
//   const courtComplexes = await cachedGet(
//     `courtComplexes-of-district-${district.name}-${district.numericCode}-state-${district.state}`,
//     () =>
//       getCourtComplexes(
//         district.stateNumericCode.toString(),
//         district.numericCode.toString(),
//       ),
//     [],
//   );

//   allCourtComplexes.push({
//     district: district.name,
//     districtCode: district.numericCode,
//     state: district.state,
//     stateCode: district.stateNumericCode,
//     courtComplexes,
//   });
// }

// const flatComplexes = allCourtComplexes.flatMap((complex) =>
//   complex.courtComplexes.map((courtComplex) => ({
//     ...courtComplex,
//     stateCode: complex.stateCode,
//     state: complex.state,
//     district: complex.district,
//     districtCode: complex.districtCode,
//   })),
// );

// // const districtCourts = flatComplexes.flatMap(complex =>
// //   complex.courts.map(court => ({
// //     ...court,
// //     stateCode: complex.stateCode,
// //     state: complex.state,
// //     district: complex.district,
// //     districtCode: complex.districtCode,
// //     complex: complex.name,
// //     complexCode: complex.code,
// //   }))
// // );

// // Chief Judicial Magistrate Court Complex, Agartala
// const caseTypesForEachComplex: {
//   complex: {
//     code: number;
//     name: string;
//     stateCode: number;
//     districtCode: number;
//     district: string;
//     isMasterCourtComplex: boolean;
//     masterComplexCourtCode: number;
//   };
//   court: {
//     code: number;
//     name: string;
//     dbName: string;
//     nationalCourtCode: string;
//   };
//   caseTypes: { id: string; name: string }[] | null;
// }[] = [];

// for (const complex of flatComplexes) {
//   console.log(
//     `Processing complex ${complex.name} (${caseTypesForEachComplex.length + 1} of ${flatComplexes.length})`,
//   );
//   const court = complex.courts[0];

//   const courtName = complex.name;
//   const courtCode = court ? court.code : complex.masterComplexCourtCode;

//   const courtId = court
//     ? court.nationalCourtCode
//     : complex.masterComplexCourtCode;
//   const caseTypes = await cachedGet(
//     `caseTypes-of-court-${courtName}-${courtId}`,
//     () =>
//       getCaseTypes(
//         complex.stateCode.toString(),
//         complex.districtCode.toString(),
//         courtCode.toString(),
//       ),
//     [],
//   );

//   caseTypesForEachComplex.push({
//     complex,
//     court,
//     caseTypes,
//   });
// }

// await kysely
//   .insertInto("State")
//   .values(
//     states.map((state) => ({
//       stateCode: state.numericCode.toString(),
//       name: state.name,
//     })),
//   )
//   .onConflict((c) => c.doNothing())
//   .execute();

// if (allDistricts.length === 0) {
//   throw new Error("No districts found");
// }

// await kysely
//   .insertInto("District")
//   .values(
//     allDistricts.map((district) => ({
//       name: district.name,
//       stateCode: district.stateNumericCode.toString(),
//       districtCode: district.numericCode.toString(),
//     })),
//   )
//   .onConflict((c) => c.doNothing())
//   .execute();

// if (flatComplexes.length === 0) {
//   throw new Error("No court complexes found");
// }

// console.log("Inserting court complexes");
// const uniqueComplexNames = new Set();
// for (const complex of flatComplexes) {
//   const id = slugifyCourtComplex(complex.name, complex.district);
//   if (uniqueComplexNames.has(id)) {
//     throw new Error(`Duplicate complex name found: ${complex.name} id: ${id}`);
//   }
//   uniqueComplexNames.add(id);
// }

// console.log(
//   flatComplexes.filter((complex) => complex.code.toString().length > 7),
// );

// await kysely
//   .insertInto("CourtComplex")
//   .values(
//     flatComplexes.map((complex) => ({
//       id: slugifyCourtComplex(complex.name, complex.district),
//       complexCode: complex.code.toString(),
//       stateCode: complex.stateCode.toString(),
//       districtCode: complex.districtCode.toString(),
//       name: complex.name,
//       isMasterCourtComplex: complex.isMasterCourtComplex,
//       masterComplexCourtCode: complex.masterComplexCourtCode.toString(),
//     })),
//   )
//   .onConflict((c) => c.doNothing())
//   .execute();

// for (const [index, complex] of flatComplexes.entries()) {
//   console.log(`Processing complex ${index + 1} of ${flatComplexes.length}`);
//   if (complex.courts.length === 0) {
//     console.log(`No courts found for ${complex.name}`);
//     if (complex.isMasterCourtComplex) {
//       await kysely.insertInto("DistrictCourt").values({
//         id: slugifyCourtName(complex.name, complex.district),
//         courtCode: complex.masterComplexCourtCode.toString(),
//         name: complex.name,
//         complexId: slugifyCourtComplex(complex.name, complex.district),
//         stateCode: complex.stateCode.toString(),
//         districtCode: complex.districtCode.toString(),
//       }).execute();
//       console.log("Inserted master court complex as court");
//     }
//     continue;
//   }
//   await kysely
//     .insertInto("DistrictCourt")
//     .values(
//       complex.courts.map((court) => ({
//         id: slugifyCourtName(court.name, court.nationalCourtCode),
//         courtCode: court.code.toString(),
//         name: court.name,
//         complexId: slugifyCourtName(complex.name, complex.district),
//         stateCode: complex.stateCode.toString(),
//         districtCode: complex.districtCode.toString(),
//       })),
//     )
//     .onConflict((c) => c.doNothing())
//     .execute();
// }

// for (const [_, caseTypeObj] of caseTypesForEachComplex.entries()) {
//   const caseTypes = caseTypeObj.caseTypes;
//   const complex = caseTypeObj.complex;
//   if (!caseTypes || caseTypes.length === 0) {
//     console.log(`No case types found for ${complex.name}`);
//     continue;
//   }
//   const caseTypesInsertPayload = caseTypes.map((casetype) => ({
//     id: slugifyCaseType(casetype.id, casetype.name, complex.code.toString()),
//     label: casetype.name,
//     code: casetype.id,
//     complexId: slugifyCourtComplex(complex.name, complex.district),
//   }));

//   const uniqueIds = new Set();
//   for (const payload of caseTypesInsertPayload) {
//     if (uniqueIds.has(payload.id)) {
//       throw new Error(`Duplicate case type ID found: ${payload.id}`);
//     }
//     uniqueIds.add(payload.id);
//   }

//   await kysely.insertInto("CaseType").values(caseTypesInsertPayload).execute();
// }
// console.log("all inserts done");
