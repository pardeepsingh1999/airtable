import { ADD_CLASSES, ADD_STUDENTS, CLEAR_TABLE_DATA } from "./action-types";

export const addClasses = (classes = []) => {
  return {
    type: ADD_CLASSES,
    payload: {
      classes,
    },
  };
};

export const addStudents = (students = {}) => {
  return {
    type: ADD_STUDENTS,
    payload: {
      students,
    },
  };
};

export const clearTableData = () => {
  return {
    type: CLEAR_TABLE_DATA,
  };
};
