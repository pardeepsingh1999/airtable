import { API_TABLE_KEY } from "./../config/index";
import { structureQueryParams } from "./../helpers/index";

interface MakeGetRequestTypes {
  path: string;
  params: any;
}

export const makeGetRequest = async ({ path, params }: MakeGetRequestTypes) => {
  let queryString = "";

  if (params) {
    queryString = structureQueryParams(params);
  }

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + API_TABLE_KEY,
  };

  return new Promise((resolve, reject) => {
    try {
      fetch(path + queryString, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((jsonResponse) => {
          if (jsonResponse.hasOwnProperty("error")) {
            console.log("jsonResponse>>", jsonResponse);
            reject(jsonResponse);
          } else {
            resolve(jsonResponse);
          }
        })
        .catch((e) => {
          console.log("XHR GET Error: ", e);
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};
