export interface CaseRaw {
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

export interface Case {
  crn: string;
  caseNo: {
    typeName: string;
    number: number;
    year: number;
  };
  petitioner: string;
  petitionerLawyers: string;
  respondent: string;
  respondentLawyers: string;
  typeName: string;
  dateOfDecision: string | null;
  title: string;
  rawData: CaseRaw;
}

export interface CaseHistoryRawResult {
  regcase_type: number;
  date_of_filing: string;
  cino: string;
  dt_regis: string;
  fil_no: number;
  fil_year: number;
  reg_no: number;
  reg_year: number;
  date_first_list: string;
  date_next_list: string; // 2024-09-03// nexthearing date
  archive: string;
  date_of_decision: string | null;
  disp_nature: number;
  purpose_next: number;
  court_no: number;
  pet_name: string;
  lpet_name: string;
  pet_adv: string;
  lpet_adv: string;
  res_name: string;
  lres_name: string;
  res_adv: string;
  lres_adv: string;
  res_legal_heir: string;
  pet_legal_heir: string;
  hide_pet_name: string;
  hide_res_name: string;
  pet_status: number;
  res_status: number;
  under_act1: number;
  under_act2: number;
  under_act3: number;
  under_act4: number;
  under_sec1: string;
  under_sec2: string;
  under_sec3: string;
  under_sec4: string;
  fir_no: string;
  police_st_code: number;
  fir_year: number;
  lower_court_code: number;
  lower_court: string;
  lower_court_dec_dt: number;
  case_no: string;
  goshwara_no: number;
  date_last_list: string;
  transfer_est: string;
  main_matter_cino: string;
  main_case_no: string;
  time_slot: number;
  purpose_name: string;
  lpurpose_name: string | null;
  ltype_name: string;
  type_name: string;
  petNameAdd: string;
  str_error: string;
  desgname: string;
  resNameAdd: string;
  str_error1: string;
  act: string;
  fir_details: string | null;
  historyOfCaseHearing: string | null; // html to  par
  subordinateCourtInfoStr: string | null;
  interimOrder: string | null;
  finalOrder: string | null;
  transfer: string | null;
  courtno: number;
  ldesgname: string;
  desgcode: number;
  judcode: number;
  jcode: number;
  petparty_name: string;
  resparty_name: string;
  court_name: string;
  est_code: string;
  lcourt_name: string;
  state_code: number;
  district_code: number;
  state_name: string;
  lstate_name: string;
  district_name: string;
  ldistrict_name: string;
  transfer_est_flag: string | null;
  transfer_est_name: string | null;
  transfer_est_date: string | null;
  writinfo: string | null;
  processes: string | null;
  complex_code: number;
  court_code: number;
  iaFiling: string | null;
  sub_matter: string | null;
  main_matter: string | null;
  link_cases: string | null;
  hide_partyname_est: string;
}

export interface CaseHistory extends Omit<Case, "rawData"> {
  nextHearingDate: Date;
  rawData: CaseHistoryRawResult;
}
