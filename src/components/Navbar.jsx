import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";
import NavCatagories from "./NavCatagories";

const Navbar = () => {
  const { user, userDetails, loading } = useAuth();
  if (loading) {
    return;
  }
  return (
    <div className="bg-gray-800">
      <div className="container flex z-100">
        <NavCatagories />
        <div className="flex items-center justify-between flex-grow  md:pl-12 py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center space-x-6 text-center capitalize">
            <NavLink
              to="/"
              className="text-gray-200 hover:text-white transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="text-gray-200 hover:text-white transition"
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-200 hover:text-white transition"
            >
              About us
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-200 hover:text-white transition"
            >
              Contact us
            </NavLink>
          </div>
          {user ? (
            <div>
              <span className="mx-1 text-white"> {userDetails?.name}</span>
              <span className="text-white"> | </span>
              <Logout />
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-200 hover:text-white transition"
            >
              {user ? user?.email : "Login/Register"}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
