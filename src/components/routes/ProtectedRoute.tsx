import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../../guards/auth-guard";

interface Props {
  redirectRoute: string;
}

const ProtectedRoute = ({ redirectRoute }: Props) => {
  const auth = isUserAuthenticated();

  return auth ? <Outlet /> : <Navigate replace to={redirectRoute} />;
};

export default ProtectedRoute;
