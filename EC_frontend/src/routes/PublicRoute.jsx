import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (user.role === ROLES.SELLER) {
      return (
        <Navigate
          to="/seller/dashboard"
          replace
        />
      );
    }

    if (user.role === ROLES.ADMIN) {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;