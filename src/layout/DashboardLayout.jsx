import { HouseLine, List, SignOut, User, XSquare } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Logout from "../components/Logout";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import RoleBaseRoute from "../userDashboard/RoleBaseRoute";
const DashboardLayout = () => {
  const [show, setShow] = useState(false);
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative grid grid-cols-12 gap-4 ">
      <div className="block md:hidden absolute  w-full bg-white">
        <button
          onClick={() => setShow(!show)}
          className="block md:hidden absolute left-4 top-4 bg-white"
        >
          <List size={20} />
        </button>
      </div>
      {show && (
        <div className="absolute bg-white md:hidden items-start lg:col-span-1 p-4  border w-52  h-screen z-10">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-2 h-min">
              <div className="flex justify-start items-center gap-2">
                <i className="fa-brands fa-shopify text-3xl text-primary"></i>
                <h1 className="text-xl font-medium font">Gift Haven</h1>
              </div>
              <button onClick={() => setShow(false)}>
                <XSquare size={20} />
              </button>
            </div>
            <Link
              className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded"
              to="/dashboard"
            >
              <User size={20} /> Overview
            </Link>
            <RoleBaseRoute />
            <Link
              to="/"
              className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded"
            >
              <HouseLine size={20} />
              Home
            </Link>
            <div className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded">
              <SignOut size={20} />
              <Logout type="dash" />
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:grid items-start lg:col-span-2 md:col-span-3 border  h-screen p-6 lg:p-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-start items-center gap-2 h-min">
            <div className="flex justify-start items-center gap-2">
              <i className="fa-brands fa-shopify text-3xl text-primary"></i>
              <h1 className="text-xl font-medium font">Gift Haven</h1>
            </div>
          </div>
          <Link
            className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded"
            to="/dashboard"
          >
            <User size={20} /> Overview
          </Link>
          <RoleBaseRoute />
          <Link
            to="/"
            className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded"
          >
            <HouseLine size={20} />
            Home
          </Link>
          <div className="flex justify-start items-center gap-2 border p-2 text-center hover:border-red-500 rounded">
            <SignOut size={20} />
            <Logout type="dash" />
          </div>
        </div>
      </div>
      <div className="grid col-span-12 md:col-span-9 lg:col-span-10 border  px-6 py-10 md:p-10 h-screen  overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
