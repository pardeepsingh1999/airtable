import { InitialStateTypes } from "../../interface";
import { ADD_USER_CREDENTIAL, CLEAR_USER_CREDENTIAL } from "./action-types";

export const addUserCredential = (data: InitialStateTypes) => {
  return {
    type: ADD_USER_CREDENTIAL,
    payload: {
      ...data,
    },
  };
};

export const clearUserCredential = () => {
  return {
    type: CLEAR_USER_CREDENTIAL,
  };
};
