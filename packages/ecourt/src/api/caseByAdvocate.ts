import type { CaseByAdvocateNameParams } from "./types";
import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

interface CaseByAdvocateNameEncryptedResult extends Record<string, string> {
  // all keys encrypted
  court_code: string;
  establishment_name: string;
  caseNos: string;
}

interface Case {
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
  lextra_party: string;
  party_name1: string;
  party_name2: string;
  date_of_decision: string | null;
  orcase: string;
  adv_name1: string;
  adv_name2: string;
  ladv_name1: string;
  ladv_name2: string;
  type_name: string;
  petnameadArr: string;
}

export interface CaseByAdvocateNameResult {
  courtCode: string;
  establishmentName: string;
  caseNos: Case[];
}

/* sample *
   {
      court_code: '8',
      establishment_name: 'Principal Munsiffs Court, Kannur',
      caseNos: [
        {
          cino: 'KLKN110000692020',
          case_no: '204700000032020',
          case_no2: 3,
          regcase_type: 47,
          reg_year: 2020,
          pet_name: 'Parambantavida Abdul Salam',
          lpet_name: '',
          res_name: 'C.H. Amina',
          lres_name: '',
          extra_party: '',
          lextra_party: '',
          party_name1: 'N',
          party_name2: 'N',
          date_of_decision: null,
          orcase: 'a',
          adv_name1: 'Prakash M K',
          adv_name2: 'Deepak Madathil',
          ladv_name1: '',
          ladv_name2: '',
          type_name: 'OS',
          petnameadArr: 'Parambantavida Abdul Salam<br/> Vs <br/>C.H. Amina'
        }
      ]
    }
*/

export async function getCasesByAdvocateName(params: CaseByAdvocateNameParams) {
  const reqParams = {
    state_code: params.stateCode,
    dist_code: params.districtCode,
    court_code: params.courtCode,
    advocateName: params.advocate,
    pendingDisposed: params.status,

    checkedSearchByRadioValue: "1",
    year: "",
    barstatecode: "",
    barcode: "",
    date: "",
    language_flag: "english",
    bilingual_flag: "0",
  };

  const res = (await makeRequest(
    "/searchByAdvocateName.php",
    reqParams,
  )) as CaseByAdvocateNameEncryptedResult;

  const decryptedRes: CaseByAdvocateNameResult = {
    courtCode: decodeResponse<string>(res.court_code),
    establishmentName: decodeResponse<string>(res.establishment_name),
    caseNos: decodeResponse<Case[]>(res.caseNos),
  };

  return decryptedRes;
}
