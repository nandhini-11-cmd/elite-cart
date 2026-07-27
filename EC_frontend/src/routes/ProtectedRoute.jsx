import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Loader from "../components/common/Loader";

const ProtectedRoute = ({
  children,
  role,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    role &&
    user.role !== role
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;