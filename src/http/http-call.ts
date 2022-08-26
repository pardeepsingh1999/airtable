import { BASE_URL } from "../config";
import { makeGetRequest } from "./http-servies";

export const getStudents = (params: any) => {
  return new Promise((resolve, reject) => {
    makeGetRequest({ path: `${BASE_URL}/Students`, params })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getClasses = (params: any) => {
  return new Promise((resolve, reject) => {
    makeGetRequest({ path: `${BASE_URL}/Classes`, params })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};
