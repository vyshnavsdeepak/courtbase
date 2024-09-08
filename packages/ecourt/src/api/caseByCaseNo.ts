import type { DistrictCourtCaseByCaseNoParams } from "./types";
import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

/*
  {
  cino: 'KLKN110008752018',
  case_no: '204700003532018',
  case_no2: 353,
  regcase_type: 47,
  reg_year: 2018,
  pet_name: 'D***** P***',
  lpet_name: '',
  res_name: 'S***',
  lres_name: '',
  extra_party: '',
  party_name1: 'N',
  party_name2: 'N',
  date_of_decision: null,
  orcase: 'a',
  type_name: 'OS',
  petrnamedArr: 'D***** P***<br/> Vs <br/>S***'
}
*/
interface CaseResult {
  cino: string;
  case_no: string;
  case_no2: number;
  regcase_type: number;
  reg_year: number;
  pet_name: string;
  lpet_name: string;
  res_name: string;
  lres_name: string;
  extra_party: string;
  party_name1: string;
  party_name2: string;
  date_of_decision: string | null;
  orcase: string;
  type_name: string;
  petnameadArr: string;
}

export const getCaseByCaseNo = async (
  params: DistrictCourtCaseByCaseNoParams,
) => {
  const result = (await makeRequest("/caseNumberSearch.php", params)) as {
    court_code: string;
    establishment_name: string;
    caseNos: string;
  };
  try {
    const caseRes = decodeResponse<CaseResult[]>(result.caseNos)[0];
    if (!caseRes) {
      throw new Error("Case not found");
    }
    return caseRes;
  } catch (e: unknown) {
    throw new Error("[getCaseByCaseNo]" + (e as Error).message);
  }
};
