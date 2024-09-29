import { kysely } from "@court-base/db";

import { slugifyCourtName } from "../utils/courts-utils";

const masterCourtComplexes = await kysely
  .selectFrom("CourtComplex")
  .leftJoin("District", "CourtComplex.districtCode", "District.districtCode")
  .select([
    "CourtComplex.id",
    "CourtComplex.name",
    "CourtComplex.stateCode",
    "CourtComplex.districtCode",
    "CourtComplex.masterComplexCourtCode",
    "District.name as districtName",
  ])
  .where("isMasterCourtComplex", "=", true)
  .execute();
console.log(masterCourtComplexes);

await kysely
  .insertInto("DistrictCourt")
  .values(
    masterCourtComplexes.map((complex) => {
      if (complex.districtName === null) {
        console.log(complex);
        throw new Error(`District name is null for ${complex.name}`);
      }
      if (complex.masterComplexCourtCode === null) {
        console.log(complex);
        throw new Error(
          `Master complex court code is null for ${complex.name}`,
        );
      }
      return {
        id: slugifyCourtName(complex.name, complex.districtName),
        courtCode: complex.masterComplexCourtCode.toString(),
        name: complex.name,
        complexId: complex.id,
        stateCode: complex.stateCode,
        districtCode: complex.districtCode,
      };
    }),
  )
  .execute();

console.log("Master court complexes inserted successfully");
