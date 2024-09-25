import * as cheerio from "cheerio";

import type {
  Case,
  CaseHistory,
  CaseHistoryLog,
  CaseHistoryRawResult,
  CaseRaw,
} from "./types-api-results";
import { parseISTDate } from "../lib/time";

export function transformCase(rawCase: CaseRaw): Case {
  let title;
  if (rawCase.petnameadArr.startsWith("XXXXXXX")) {
    title = rawCase.pet_name + " Vs " + rawCase.res_name;
  } else {
    title = rawCase.petnameadArr.replace(/<br\/> Vs <br\/>/g, " Vs ");
  }
  return {
    crn: rawCase.cino,
    caseNo: {
      typeName: rawCase.type_name,
      number: rawCase.case_no2,
      year: rawCase.reg_year,
    },
    petitioner: rawCase.pet_name,
    petitionerLawyers: rawCase.adv_name1,
    respondent: rawCase.res_name,
    respondentLawyers: rawCase.adv_name2,
    typeName: rawCase.type_name,
    title,
    dateOfDecision: rawCase.date_of_decision,
    rawData: rawCase, // Storing the raw data for reference
  };
}
function parseTableToJson(html: string): CaseHistoryLog {
  const $ = cheerio.load(html);
  const result: CaseHistoryLog = [];
  /*
    [
      {
      judge: 'Judge, Family Court, Kannur',
      businessOnDate: '16-10-2023',
      hearingDate: '06-11-2023',
      purposeOfHearing: 'Plaintiff/Petitioner Evidence'
      },
      {
        judge: 'Judge, Family Court, Kannur',
        businessOnDate: '06-11-2023',
        hearingDate: '10-11-2023',
        purposeOfHearing: 'Appearance of Party'
      },
    ]
  */
  $("tbody tr").each((_index, element) => {
    const judge = $(element).find("td").eq(0).text().trim();
    const businessOnDate = $(element).find("td").eq(1).text().trim();
    const hearingDate = $(element).find("td").eq(2).text().trim();
    const purposeOfHearing = $(element).find("td").eq(3).text().trim();

    const parsedBusinessOnDate = parseISTDate(businessOnDate);
    const parsedHearingDate = hearingDate
      ? parseISTDate(hearingDate)
      : undefined;
    result.push({
      judge,
      businessOnDate: parsedBusinessOnDate,
      hearingDate: parsedHearingDate,
      purposeOfHearing,
    });
  });

  return result;
}

// const test = `<table border=\"0\" class='table tbl-result'><thead><tr><th scope=\"col\" style=''>Judge</th><th scope=\"col\" style=''>Business on Date</th><th scope=\"col\" style=''>Hearing Date</th><th scope=\"col\" style=''>Purpose of Hearing</th></tr></thead><tbody><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>23-09-2023</td><td>28-09-2023</td><td style=''> call on</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>28-09-2023</td><td>16-10-2023</td><td style=''> call on</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>16-10-2023</td><td>06-11-2023</td><td style=''> Plaintiff/Petitioner Evidence</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>06-11-2023</td><td>10-11-2023</td><td style=''> Appearance of Party</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>10-11-2023</td><td>19-12-2023</td><td style=''> Await report</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>19-12-2023</td><td>25-01-2024</td><td style=''> Await report</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>25-01-2024</td><td>20-02-2024</td><td style=''> Await report</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>20-02-2024</td><td>15-04-2024</td><td style=''> For counter</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>15-04-2024</td><td>21-05-2024</td><td style=''> For Steps</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>21-05-2024</td><td>03-07-2024</td><td style=''> For Steps</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>03-07-2024</td><td>06-08-2024</td><td style=''> For evidence</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>06-08-2024</td><td>21-08-2024</td><td style=''> With Connected Case</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>21-08-2024</td><td>07-09-2024</td><td style=''> With Connected Case</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>07-09-2024</td><td>19-09-2024</td><td style=''> With Connected Case</td></tr><tr><td align='left' style=''>Judge, Family Court, Kannur</td><td align='left' style=''>19-09-2024</td><td>25-09-2024</td><td style=''> With Connected Case</td></tr>`;

export function transformCaseHistory(
  rawCase: CaseHistoryRawResult,
): CaseHistory {
  const title = rawCase.pet_name + " Vs " + rawCase.res_name;
  const { historyOfCaseHearing } = rawCase;
  const caseHistoryLog = historyOfCaseHearing
    ? parseTableToJson(historyOfCaseHearing)
    : [];

  return {
    crn: rawCase.cino,
    caseNo: {
      typeName: rawCase.type_name,
      number: rawCase.reg_no,
      year: rawCase.reg_year,
    },
    nextHearingDate: parseISTDate(rawCase.date_next_list, "yyyy-MM-dd"),
    petitioner: rawCase.pet_name,
    petitionerLawyers: rawCase.pet_adv,
    respondent: rawCase.res_name,
    respondentLawyers: rawCase.res_adv,
    typeName: rawCase.type_name,
    title,
    dateOfDecision: rawCase.date_of_decision,
    caseHistoryLog,
    rawData: rawCase,
  };
}
