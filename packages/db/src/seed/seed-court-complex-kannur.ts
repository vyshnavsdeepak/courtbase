import { kysely } from "@court-base/db";

const state = {
  name: "Kerala",
  code: "4",
};

const district = {
  name: "Kannur",
  code: "3",
};

const CourtComplexToCourtsMap = {
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

async function seed() {
  try {
    await kysely
      .insertInto("State")
      .values({
        name: state.name,
        stateCode: state.code, // state code is unique to India
      })
      .execute();

    await kysely
      .insertInto("District")
      .values({
        name: district.name,
        districtCode: district.code,
        stateCode: state.code,
      })
      .execute();

    const courtComplexArr = Object.entries(CourtComplexToCourtsMap).map(
      ([complexName, courtCodes]) => ({
        name: complexName,
        courtCodes,
        stateCode: state.code,
        districtCode: district.code,
      }),
    );

    await kysely.insertInto("CourtComplex").values(courtComplexArr).execute();

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await kysely.destroy();
  }
}

void seed().finally(() => process.exit(0));
