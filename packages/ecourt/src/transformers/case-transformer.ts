import type {
  Case,
  CaseHistory,
  CaseHistoryRawResult,
  CaseRaw,
} from "./types-api-results";

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

export function transformCaseHistory(
  rawCase: CaseHistoryRawResult,
): CaseHistory {
  let title;
  if (rawCase.petNameAdd.startsWith("XXXXXXX")) {
    title = rawCase.pet_name + " Vs " + rawCase.res_name;
  } else {
    title = rawCase.petNameAdd.replace(/<br\/> Vs <br\/>/g, " Vs ");
  }

  return {
    crn: rawCase.cino,
    caseNo: {
      typeName: rawCase.type_name,
      number: rawCase.regcase_type,
      year: rawCase.reg_year,
    },
    nextHearingDate: new Date(rawCase.date_next_list),
    petitioner: rawCase.pet_name,
    petitionerLawyers: rawCase.pet_adv,
    respondent: rawCase.res_name,
    respondentLawyers: rawCase.res_adv,
    typeName: rawCase.type_name,
    title,
    dateOfDecision: rawCase.date_of_decision,
    rawData: rawCase,
  };
}
