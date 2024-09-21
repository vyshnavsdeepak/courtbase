import { makeRequest } from "../lib/api-client";
import { decodeResponse } from "../lib/response-decoder";

interface Court {
  db_name: string;
  court_name: string;
  mcourt_name: string;
  server_ip: string;
  server_uid: string;
  server_pwd: string;
  pune_delhi: number;
  version3: string;
  pgsql_mysql: string;
  court_code: number;
  serverip_order: string;
  national_court_code: string;
}

interface CourtComplex {
  complex_code: number;
  njdg_est_code: string | number;
  court_complex_name: string;
  lcourt_complex_name: string;
  njdg_state_code: number;
  njdg_dist_code: number;
  differ_mast_est: string;
  // [key: string]: Court | number | string
  [key: string]: Record<string, Court> | number | string;
}

export const getCourtComplexes = async (
  stateCode: string,
  districtCode: string,
) => {
  const params = {
    state_code: stateCode,
    dist_code: districtCode,
    action_code: "fillCourtComplex",
  };

  const response = (await makeRequest("/courtEstWebService.php", params)) as {
    courtComplex: string;
  };
  const courtComplexes = decodeResponse<CourtComplex[]>(response.courtComplex);
  // console.log(JSON.stringify(courtComplexes, null, 2));
  let isMasterCourtComplex = false;
  let masterComplexCourtCode = 0;
  // console.log("courtComplexes", JSON.stringify(courtComplexes, null, 2));
  return courtComplexes.map((courtComplex) => {
    const courtCodesCsv = courtComplex.njdg_est_code;
    const courtsObject = courtComplex[courtCodesCsv] as
      | Record<string, Court | undefined>
      | undefined;
    if (typeof courtCodesCsv === "string" && typeof courtsObject !== "object") {
      throw new Error(`Expected object, got ${typeof courtsObject}`);
    } else if (typeof courtCodesCsv === "number") {
      isMasterCourtComplex = true;
      masterComplexCourtCode = courtCodesCsv;
    }

    const courts = courtsObject
      ? Object.values(courtsObject)
          .filter((c) => !!c)
          .map((court) => ({
            name: court.court_name,
            dbName: court.db_name,
            nationalCourtCode: court.national_court_code,
            code: court.court_code,
          }))
      : [];
    return {
      code: courtComplex.complex_code,
      name: courtComplex.court_complex_name,
      courts,
      isMasterCourtComplex,
      masterComplexCourtCode,
    };
  });

  /*
  [
  {
    "complex_code": 1040031,
    "njdg_est_code": "8,9,10,11,12,20,23,31,33",
    "court_complex_name": "COURT COMPLEX KANNUR",
    "lcourt_complex_name": "",
    "njdg_state_code": 4,
    "njdg_dist_code": 3,
    "differ_mast_est": "N",
    "8,9,10,11,12,20,23,31,33": {
      "8": {
        "db_name": "pmcknr",
        "court_name": "Principal Munsiffs Court, Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 8,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN11"
      },
      "9": {
        "db_name": "jfcm3knr",
        "court_name": "Judicial First Class Magistrate Court 3 Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 9,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN15"
      },
      "10": {
        "db_name": "jfcm2knr",
        "court_name": "Judicial First Class Magistrate Court 2 Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 10,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN14"
      },
      "11": {
        "db_name": "jfcm1knr",
        "court_name": "Judicial First Class Magistrate Court 1 Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 11,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN13"
      },
      "12": {
        "db_name": "amcknr",
        "court_name": "Additional Munsiffs Court Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 12,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN12"
      },
      "20": {
        "db_name": "scknr",
        "court_name": "Sub Court, Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 20,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN10"
      },
      "23": {
        "db_name": "fcknr",
        "court_name": "Family Court,Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 23,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN09"
      },
      "31": {
        "db_name": "ccknr",
        "court_name": "Commercial Court Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 31,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN26"
      },
      "33": {
        "db_name": "ftscknr",
        "court_name": "Fast Track special Cour-POCSO, Kannur",
        "mcourt_name": "",
        "server_ip": "10.192.101.189",
        "server_uid": "postgres",
        "server_pwd": "",
        "pune_delhi": 1,
        "version3": "3",
        "pgsql_mysql": "p",
        "court_code": 33,
        "serverip_order": "10.192.102.153",
        "national_court_code": "KLKN33"
      }
    }
  }
]*/
};

// getCourtComplexes("20", "1").then(console.log).catch(console.error);
