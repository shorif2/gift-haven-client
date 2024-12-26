import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const BuyerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading, userData } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (userData?.role === "seller") {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default BuyerRoute;
