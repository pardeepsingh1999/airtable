import { InitialStateTypes } from "../../interface";
import { ADD_USER_CREDENTIAL, CLEAR_USER_CREDENTIAL } from "../actions/";

interface ActionTypes {
  type: string;
  payload: InitialStateTypes;
}

const initialState = {
  studentId: null,
  fields: null,
};

export const userCredentialReducer = (
  state = initialState,
  action: ActionTypes
) => {
  let newState: InitialStateTypes = { ...state };
  switch (action.type) {
    case ADD_USER_CREDENTIAL: {
      newState = {
        studentId: action.payload.studentId,
        fields: action.payload.fields,
      };
      break;
    }
    case CLEAR_USER_CREDENTIAL: {
      newState = initialState;
      break;
    }
    default:
  }
  return newState;
};
