import { store } from "../redux/store";

export const isUserAuthenticated = () => {
  const state: any = store.getState();

  if (state?.userCredential?.studentId) return true;

  return false;
};
