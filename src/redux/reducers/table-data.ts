import { ADD_CLASSES, ADD_STUDENTS, CLEAR_TABLE_DATA } from "../actions";

interface InitialStateTypes {
  students: object;
  classes: any[];
}

interface ActionTypes {
  type: string;
  payload: InitialStateTypes;
}

const initialState: InitialStateTypes = {
  students: {},
  classes: [],
};

export const tableDataReducer = (state = initialState, action: ActionTypes) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CLASSES: {
      newState.classes = action.payload.classes;
      break;
    }
    case ADD_STUDENTS: {
      newState.students = action.payload.students;
      break;
    }
    case CLEAR_TABLE_DATA: {
      newState = initialState;
      break;
    }
    default:
  }
  return newState;
};
