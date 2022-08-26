import toast from "react-hot-toast";
import { clearTableData } from "../redux/actions/table-data";
import { clearUserCredential } from "../redux/actions/user-credential";
import { store as REDUX_STORE } from "../redux/store";

export const logout = (navigate: any) => {
  REDUX_STORE.dispatch(clearUserCredential());
  REDUX_STORE.dispatch(clearTableData());

  if (navigate) navigate("/login", { replace: true });
  else window.location.reload();
};

export const structureQueryParams = (params: any) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const showToast = (message: string, type = "error", duration = 4000) => {
  (toast as any)[type](message, { duration });
};

export const errorHandler = (error?: any) => {
  console.log("error>>", error);
  showToast(
    error?.reason?.length || error?.message?.length
      ? error?.reason || error?.message
      : "Something went wrong, Try again after some time."
  );
};
