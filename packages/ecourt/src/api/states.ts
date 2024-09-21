import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

interface State {
  state_code: number;
  state_name: string;
  marstate_name: string;
  nationalstate_code: string;
  st_census_code: number;
  state_lang: string;
  bilingual: string;
  state_name_marathi: string;
  state_name_hindi: string;
  state_name_gujrati: string;
  state_name_kannada: string;
  state_name_tamil: string;
  esummons_sharing: string;
}

export async function getStates() {
  const params = {
    action_code: "fillState",
    time: (Date.now() / 1000).toFixed(2),
  };
  const response = (await makeRequest("/stateWebService.php", params)) as {
    states: string;
  };
  const states = decodeResponse<State[]>(response.states);
  /*
    states[] = [ {
    state_code: 24,
    state_name: 'Sikkim',
    marstate_name: '',
    nationalstate_code: 'SK',
    st_census_code: 11,
    state_lang: '',
    bilingual: 'N',
    state_name_marathi: 'सिक्कीम',
    state_name_hindi: 'सिक्किम',
    state_name_gujrati: 'સિક્કિમ',
    state_name_kannada: 'ಸಿಕ್ಕಿಂ',
    state_name_tamil: 'சிக்கிம்',
    esummons_sharing: 'N'
  }]
*/
  return states.map((state) => ({
    name: state.state_name,
    numericCode: state.state_code,
    nationalCode: state.nationalstate_code,
  }));
}
