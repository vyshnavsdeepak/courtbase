import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

interface District {
  dist_code: number;
  dist_name: string;
  mardist_name: string;
  dist_census_code: number;
}

export const getDistricts = async (stateCode: string) => {
  const params = { state_code: stateCode };
  const response = (await makeRequest("/districtWebService.php", params)) as {
    districts: string;
  };
  const districts = decodeResponse<District[]>(response.districts);
  /* [{
    dist_code: 16,
    dist_name: 'Wayanad',
    mardist_name: '',
    dist_census_code: 590
  }] */
  return districts.map((district) => ({
    name: district.dist_name,
    numericCode: district.dist_code,
  }));
};
