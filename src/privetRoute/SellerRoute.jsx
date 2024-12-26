import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SellerRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading, userData } = useAuth();
  console.log(userData, user);
  //   if (loading) {
  //     return (
  //       <div className="w-full flex justify-center items-center">
  //         <progress className="progress w-56"></progress>
  //       </div>
  //     );
  //   }
  if (userData?.role === "seller") {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default SellerRoute;
