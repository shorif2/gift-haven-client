import { NavLink } from "react-router-dom";
import NavCatagories from "./NavCatagories";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";
import useUserData from "../hooks/useUserData";

const Navbar = () => {
  const { user } = useAuth();
  const userData = useUserData();

  return (
    <div className="bg-gray-800">
      <div className="container flex z-100">
        <NavCatagories />
        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
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
              <span className="mx-1 text-white"> {userData?.name} </span>
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
