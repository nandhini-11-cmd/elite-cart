import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RoleRoute = ({
  children,
  role,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default RoleRoute;