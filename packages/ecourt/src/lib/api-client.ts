import axios from "axios";

import { encryptObjectEachKey } from "./request-crypto";

const getHeaders = () => {
  return {
    host: "app.ecourts.gov.in",
    "user-agent": "eCourtsServices/2.0.1 (iPhone; iOS 17.5.1; Scale/3.00)",
    "accept-language": "en-IN;q=1",
    "accept-encoding": "gzip",
    connection: "keep-alive",
    cookie: "JSESSION=57390348; PHPSESSID=jou5hsg5fv2vi73k28dsnpf5pq",
  };
};

const baseUrl = "https://app.ecourts.gov.in/ecourt_mobile_encrypted_DC";

type Endpoint =
  | "/searchByAdvocateName.php"
  | "/caseHistoryWebService.php"
  | "/caseNumberSearch.php";

type RequestData = Record<string, string>;

const makeRequest = (endpoint: Endpoint, data: RequestData) => {
  const paramsEncrypted = encryptObjectEachKey(data);
  return new Promise((resolve, reject) => {
    const source = axios.CancelToken.source();

    axios
      .get(`${baseUrl}${endpoint}`, {
        params: paramsEncrypted,
        headers: getHeaders(),
        cancelToken: source.token,
        beforeRedirect: () => {
          source.cancel("Request canceled at beforeRedirect");
          reject(new Error("Request canceled at beforeRedirect"));
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.error(
            "[eCourtAPI]Request canceled",
            error.message,
            "endpoint: ",
            endpoint,
            "data: ",
            data,
          );
        } else {
          console.error(
            "[eCourtAPI]Request failed",
            error,
            "endpoint: ",
            endpoint,
            "data: ",
            data,
          );
        }
        reject(
          new Error(
            "eCourtAPI failed, reason: " +
              error +
              " endpoint: " +
              endpoint +
              " data: " +
              JSON.stringify(data),
          ),
        );
      });
  });
};

export { makeRequest };
