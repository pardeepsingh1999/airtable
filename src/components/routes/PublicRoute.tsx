import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../../guards/auth-guard";

interface Props {
  redirectRoute: string;
}

const PublicRoute = ({ redirectRoute }: Props) => {
  const auth = isUserAuthenticated();

  return auth ? <Navigate replace to={redirectRoute} /> : <Outlet />;
};

export default PublicRoute;
