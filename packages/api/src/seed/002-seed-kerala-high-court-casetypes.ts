import slugify from "slugify";

import { kysely } from "@court-base/db";

import { slugifyCourtName } from "../utils/courts-utils";

const casetypesArr = [
  { id: "56", name: "AOP - OP(ARBITRATION)" },
  { id: "59", name: "AS - APPEAL SUIT" },
  { id: "71", name: "AS ELE - APPEAL SUIT(ELECTION)" },
  { id: "73", name: "CA - CHECQUE APPLICATION" },
  { id: "29", name: "CC - CALENDAR CASE" },
  { id: "63", name: "CMA - CIVIL MISC.APPEAL" },
  { id: "75", name: "CMC - Civil Misceleneous cases" },
  { id: "24", name: "Complnt.Case - COMPLAINT CASE" },
  { id: "68", name: "Comsn.Apln - COMMISSION APPLICATION" },
  { id: "55", name: "CP - COMMITAL PROCEEDING" },
  { id: "20", name: "Crl.A - CRIMINAL APPEAL" },
  { id: "21", name: "Crl.Case - CRIMINAL CASE" },
  { id: "46", name: "Crl.MC - CRIMINAL MISC.CASES" },
  { id: "31", name: "Crl.MP - CRIMINAL MISCELLANEOUS PETN." },
  { id: "45", name: "Crl.RP - CRIMINAL REVISION PETITION" },
  { id: "54", name: "EA - EXECUTION APPLICATION" },
  { id: "1", name: "Ele.Apl - ELECTION APPEAL" },
  { id: "51", name: "EP - EXECUTION PETITION" },
  { id: "13", name: "FDIA - FINAL DECREE INTERIM APPLICATI" },
  { id: "14", name: "FD.Prds - FINAL DECREE PROCEEDINGS" },
  { id: "7", name: "GOP - OP(GUARDIAN AND WARDS)" },
  { id: "53", name: "IA - INTERLOCUTORY APPLICATION" },
  { id: "50", name: "IOP - OP(INDIGENT)" },
  { id: "57", name: "IP - INSOLVENCY PETITION" },
  { id: "58", name: "LAR - LAND ACQUISITION REFERENCE" },
  { id: "78", name: "LP - Long Pending Case" },
  { id: "25", name: "MC - MISCELLANEOUS CASE" },
  { id: "76", name: "MCA - Miscellaneous Civil Application" },
  { id: "30", name: "MTA - MEDICAL TRIBUNAL APPEAL" },
  { id: "69", name: "MVAA - MOTOR VEHICLES ACT APPEAL" },
  { id: "11", name: "MVARP - MV ACT REVISION PETITION" },
  { id: "65", name: "OA - ORIGINAL APPLICATION" },
  { id: "48", name: "OP - ORIGINAL PETITION" },
  { id: "10", name: "OP Co.Scty - CO-OPERATIVE SOCIETY" },
  { id: "64", name: "OP Elcty - OP(ELECTRICITY)" },
  { id: "49", name: "OP Ele - OP(ELECTION CASE)" },
  { id: "2", name: "OP H and M - xx" },
  { id: "3", name: "OP Inslv - OP(INSOLVENCY)" },
  { id: "12", name: "OP MV - OP (MOTOR VEHICLE)" },
  { id: "19", name: "OP Paup - OP(PAUPER)" },
  { id: "70", name: "OP Tran - OP(TRANSFER)" },
  { id: "26", name: "OP Trst - ORIGINAL PETITION(TRUST)" },
  { id: "47", name: "OS - ORIGINAL SUIT" },
  { id: "5", name: "OS Cpy.Rt - COPY RIGHT" },
  { id: "6", name: "OS Trd.Mrk - TRADE MARKS" },
  { id: "60", name: "OS WAKF - ORIGINAL SUIT(WAKF)" },
  { id: "4", name: "PL.case - PRE-LITIGATION" },
  { id: "61", name: "Probt.Prds - PROBATE PROCEEDINGS" },
  { id: "62", name: "RCA - RENT CONTROL APPEAL" },
  { id: "15", name: "RCP - RENT CONTROL PETITION" },
  { id: "52", name: "RCP. - RENT CONTROL PETITION" },
  { id: "42", name: "RCRP - RENT CONTROL REVISION PETITIO" },
  { id: "43", name: "Restor.Ptn - RESTORATION PETITION" },
  { id: "77", name: "REV.P - REVIEW PETITION" },
  { id: "72", name: "RPIA - RESTORATION PETITION INTER APP" },
  { id: "23", name: "SC - SESSIONS CASE" },
  { id: "22", name: "SOP - OP(SUCCESSION)" },
  { id: "66", name: "ST - SUMMARY TRIAL" },
  { id: "74", name: "STC - Summary Trial case" },
];

const courtName = "High Court of Kerala";
const slug = slugifyCourtName(courtName);
const { id: highCourtId } = await kysely
  .insertInto("HighCourt")
  .values({
    id: slug,
    name: courtName,
  })
  .returning("id")
  .executeTakeFirstOrThrow();

await kysely
  .updateTable("State")
  .set({
    highCourtId,
  })
  .where("stateCode", "=", "4") // Kerala
  .execute();
// Lakshadweep also shares the same high court of Kerala, similar for Haryana, Punjab, and Dadra and Nagar Haveli.

await kysely
  .insertInto("CaseType")
  .values(
    casetypesArr.map((casetype) => {
      const caseTypeLabelCode = casetype.name.split("-")[0]?.trim();
      const id = slugify(`KL-${caseTypeLabelCode}`, { lower: true });
      return {
        id,
        label: casetype.name,
        code: casetype.id,
        highCourtId,
      };
    }),
  )
  .execute();
