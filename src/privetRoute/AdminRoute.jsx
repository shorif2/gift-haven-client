import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const AdminRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading, userData } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (userData?.role === "admin") {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default AdminRoute;
