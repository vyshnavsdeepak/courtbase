import slugify from "slugify";

import { kysely } from "@court-base/db";

import { slugifyCourtName } from "../utils/courts-utils";

const courtComplexes = [
  {
    id: "gramnyayalaya-irikkur",
    name: "Gramnyayalaya Irikkur",
    courtCodes: ["25"],
  },
  {
    id: "jfcm-ftsc-mattannur",
    name: "JFCM, FTSC Mattannur",
    courtCodes: ["21", "35"],
  },
  {
    id: "district-court-thalasserry",
    name: "DISTRICT COURT THALASSERRY",
    courtCodes: ["1", "2", "3", "4", "5", "6", "7", "26", "29", "34"],
  },
  {
    id: "court-complex-thaliparambu",
    name: "Court Complex Thaliparambu",
    courtCodes: ["18", "19", "22", "30"],
  },
  {
    id: "court-complex-kannur",
    name: "COURT COMPLEX KANNUR",
    courtCodes: ["8", "9", "10", "11", "12", "20", "23", "31", "33"],
  },
  {
    id: "court-complex-sub-court-payyannur",
    name: "Court Complex, Sub Court, Payyannur",
    courtCodes: ["15", "16", "17", "32"],
  },
  {
    id: "family-court-thalassery",
    name: "Family court, Thalassery",
    courtCodes: ["24"],
  },
  {
    id: "court-complex-kuthuparambu",
    name: "Court Complex Kuthuparambu",
    courtCodes: ["13", "14"],
  },
  {
    id: "gramanyayalaya-payam",
    name: "Gramanyayalaya , Payam",
    courtCodes: ["27"],
  },
  {
    id: "gramanyayalaya-chokli",
    name: "Gramanyayalaya , Chokli",
    courtCodes: ["28"],
  },
];

export const backfillCourtComplexRemoveUuid = async () => {
  // const courts = await kysely.selectFrom("Court").selectAll().execute();
  // console.log(courts);
  const courtComplexesDB = await kysely
    .selectFrom("CourtComplex")
    .selectAll()
    .execute();

  // write to json - local
  // fs.writeFileSync("courtComplexesDB-prod.json", JSON.stringify(courtComplexesDB, null, 2));

  courtComplexesDB.forEach((courtComplex) => {
    const id = slugifyCourtName(courtComplex.name);
    if (id !== courtComplex.id) {
      console.log(id, courtComplex.id);
    } else {
      console.log("No change");
    }
  });
  await Promise.all(
    courtComplexesDB.map(async (courtComplex) => {
      const newData = courtComplexes.find((c) => c.name === courtComplex.name);
      const id = newData?.id;
      if (id) {
        await kysely
          .updateTable("CourtComplex")
          .set({ id })
          .where("id", "=", courtComplex.id)
          .execute();
      }
    }),
  );
};

const backFillCourts = async () => {
  const courts = await kysely.selectFrom("DistrictCourt").selectAll().execute();
  // console.log(courts);
  // fs.writeFileSync("courts-prod.json", JSON.stringify(courts, null, 2));
  await Promise.all(
    courts.map(async (court) => {
      const id = slugify(court.name, {
        replacement: "-",
        remove: /[*+~.()'"!:@,]/g,
        lower: true,
        strict: true,
        locale: "en",
        trim: true,
      });
      console.log({ id });
      await kysely
        .updateTable("DistrictCourt")
        .set({ id })
        .where("id", "=", court.id)
        .execute();
      console.log("done");
    }),
  );
};

void backFillCourts();

// await backfillCourtComplexRemoveUuid();
