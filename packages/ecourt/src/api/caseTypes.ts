import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

export const getCaseTypes = async (
  stateCode: string,
  districtCode: string,
  courtCode: string,
) => {
  const params = {
    state_code: stateCode,
    dist_code: districtCode,
    court_code: courtCode,
    language_flag: "english",
    bilingual_flag: "0",
  };

  const response = (await makeRequest(
    "/caseNumberWebService.php",
    params,
  )) as string;
  const decoded = decodeResponse<{ case_types: { case_type: string }[] }>(
    response,
  );
  if (!decoded.case_types[0]) {
    console.warn(
      `No case types found for ${stateCode}-${districtCode}-${courtCode}`,
    );
    return null;
  }
  const casetypes = decoded.case_types[0].case_type;
  const casetypesArr = casetypes.split("#").map((ct) => {
    const [id, name] = ct.split("~");
    if (!id || !name) {
      throw new Error(`Invalid case type [E-1]: ${ct}`);
    }
    return { id, name };
  });

  return casetypesArr;
};

// getCaseTypes("20", "1", "9").then(console.log);
