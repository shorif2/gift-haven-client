import { Link, Outlet } from "react-router-dom";
import Logout from "../components/Logout";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import RoleBaseRoute from "../userDashboard/RoleBaseRoute";

const DashboardLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" grid grid-cols-12 gap-4 ">
      <div className="grid items-start col-span-2 border  h-screen p-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-2 h-min">
            <img src="/gf-logo.png" alt="Logo" className="w-10" />
            <h1 className="text-lg font-medium">Gift Haven</h1>
          </div>
          <Link
            className="border p-2 text-center hover:border-red-500"
            to="/dashboard"
          >
            Overview
          </Link>
          <RoleBaseRoute />
          <Link to="/" className="border p-2 text-center hover:border-red-500">
            Home
          </Link>
          <div className="border p-2 text-center hover:border-red-500">
            <Logout type="dash" />
          </div>
        </div>
      </div>
      <div className="grid col-span-10 border   p-10 h-screen  overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
