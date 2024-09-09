import type { CaseHistoryRawResult } from "../transformers/types-api-results";
import type { CaseHistoryParams } from "./types";
import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";
import { transformCaseHistory } from "../transformers/case-transformer";

export const getCaseHistory = async (params: CaseHistoryParams) => {
  const result = (await makeRequest(
    "/caseHistoryWebService.php",
    params,
  )) as string;
  const rawData = decodeResponse<CaseHistoryRawResult>(result);

  return {
    crn: rawData.cino,
    case: transformCaseHistory(rawData),
    rawData,
  };
};
