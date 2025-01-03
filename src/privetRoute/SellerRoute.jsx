import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SellerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading, userData } = useAuth();
  console.log(user, userData);
  if (!loading && userData?.role === "seller") {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default SellerRoute;
