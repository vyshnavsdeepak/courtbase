import { kysely } from "@court-base/db";

import { slugifyCourtName } from "../utils/courts-utils";

interface Court {
  courtName: string;
  courtCode: string;
}

const stateData = {
  name: "Kerala",
  code: "4",
};

const districtData = {
  name: "Kannur",
  code: "3",
};

const CourtComplexToCourtsMap: Record<string, string[]> = {
  "Gramnyayalaya Irikkur": ["25"],
  "JFCM, FTSC Mattannur": ["21", "35"],
  "DISTRICT COURT THALASSERRY": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "26",
    "29",
    "34",
  ],
  "Court Complex Thaliparambu": ["18", "19", "22", "30"],
  "COURT COMPLEX KANNUR": ["8", "9", "10", "11", "12", "20", "23", "31", "33"],
  "Court Complex, Sub Court, Payyannur": ["15", "16", "17", "32"],
  "Family court, Thalassery": ["24"],
  "Court Complex Kuthuparambu": ["13", "14"],
  "Gramanyayalaya , Payam": ["27"],
  "Gramanyayalaya , Chokli": ["28"],
};

const courts: Court[] = [
  { courtName: "Gramnyayalaya Irikkur", courtCode: "25" },
  { courtName: "J F C M, Mattannur", courtCode: "21" },
  { courtName: "Fast Track Special Court, Mattannur", courtCode: "35" },
  { courtName: "District Court, Thalassery", courtCode: "1" },
  { courtName: "Sub Court, Thalassery", courtCode: "2" },
  { courtName: "Munsiff Court, Thalassery", courtCode: "3" },
  {
    courtName: "Chief Judicial Magistrate Court, Thalassery",
    courtCode: "4",
  },
  {
    courtName: "Addl. Chief Judicial Magistrate Court, Thalassery",
    courtCode: "5",
  },
  {
    courtName: "Judicial First Class Magistrate Court, Thalassery",
    courtCode: "6",
  },
  {
    courtName: "Motor Accidents Claims Tribunal,  Thalassery",
    courtCode: "7",
  },
  { courtName: "Commercial Court Thalassery", courtCode: "26" },
  {
    courtName: "Fast Track special Court POCSO ,Thalassery",
    courtCode: "29",
  },
  { courtName: "Juvenile Justice Board,Thalassery", courtCode: "34" },
  { courtName: "Munsiff Court, Taliparamba", courtCode: "18" },
  {
    courtName: "Judicial First Class Magistrate Court, Taliparamba",
    courtCode: "19",
  },
  { courtName: "MACT, Taliparamba", courtCode: "22" },
  {
    courtName: "Fast Track special Court POCSO ,Taliparamba",
    courtCode: "30",
  },
  { courtName: "Principal Munsiffs Court, Kannur", courtCode: "8" },
  {
    courtName: "Judicial First Class Magistrate Court 3 Kannur",
    courtCode: "9",
  },
  {
    courtName: "Judicial First Class Magistrate Court 2 Kannur",
    courtCode: "10",
  },
  {
    courtName: "Judicial First Class Magistrate Court 1 Kannur",
    courtCode: "11",
  },
  { courtName: "Additional Munsiffs Court Kannur", courtCode: "12" },
  { courtName: "Sub Court, Kannur", courtCode: "20" },
  { courtName: "Family Court,Kannur", courtCode: "23" },
  { courtName: "Commercial Court Kannur", courtCode: "31" },
  {
    courtName: "Fast Track special Cour-POCSO, Kannur",
    courtCode: "33",
  },
  { courtName: "Sub Court, Payyannur", courtCode: "15" },
  { courtName: "Munsiff Court, Payyannur", courtCode: "16" },
  {
    courtName: "Judicial First Class Magistrate Court, Payyannur",
    courtCode: "17",
  },
  { courtName: "Commercial Court, Payyannur", courtCode: "32" },
  { courtName: "Family Court, Thalassery", courtCode: "24" },
  { courtName: "Munsiffss Court Kuthuparamba", courtCode: "13" },
  {
    courtName: "Juditial First Class Magistrate Court Kuthuparamba",
    courtCode: "14",
  },
  { courtName: "Gramnyayalaya, Iritty at Payam", courtCode: "27" },
  { courtName: "Gramnyayalaya, Panoor  at Chokli", courtCode: "28" },
];

const courtByCode: Record<string, string> = courts.reduce(
  (acc, court) => {
    acc[court.courtCode] = court.courtName;
    return acc;
  },
  {} as Record<string, string>,
);

const courtComplexes = Object.keys(CourtComplexToCourtsMap);

async function seed() {
  try {
    const highCourtName = "High Court of Kerala";
    const slug = slugifyCourtName(highCourtName);
    const { id: highCourtId } = await kysely
      .insertInto("HighCourt")
      .values({
        id: slug,
        name: highCourtName,
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    await kysely
      .insertInto("State")
      .values({
        name: stateData.name,
        stateCode: stateData.code, // state code is unique to India
        highCourtId,
      })
      .execute();

    await kysely
      .insertInto("District")
      .values({
        name: districtData.name,
        stateCode: stateData.code,
        districtCode: districtData.code,
      })
      .execute();

    const insertedComplexes = await kysely
      .insertInto("CourtComplex")
      .values(
        courtComplexes.map((name) => ({
          id: slugifyCourtName(name),
          name,
          stateCode: stateData.code,
          districtCode: districtData.code,
        })),
      )
      .returning(["id", "name"])
      .execute();

    const complexToCourts = insertedComplexes.map((complex) => {
      const courts = CourtComplexToCourtsMap[complex.name];
      if (courts == undefined) {
        throw new Error(`No courts found for complex ${complex.name}`);
      }

      return courts.map((courtCode) => {
        const courtName = courtByCode[courtCode];
        if (courtName == undefined) {
          throw new Error(`No court found for code ${courtCode}`);
        }

        return {
          id: slugifyCourtName(courtName),
          courtCode,
          name: courtName,
          complexId: complex.id,
          stateCode: stateData.code,
          districtCode: districtData.code,
        };
      });
    });

    const flatComplexToCourts = complexToCourts.flat();
    await kysely
      .insertInto("DistrictCourt")
      .values(flatComplexToCourts)
      .execute();
  } catch (error: unknown) {
    console.error("Error seeding database:", error);
  } finally {
    await kysely.destroy();
  }
}

void seed().finally(() => process.exit(0));
