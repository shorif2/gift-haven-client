import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useShop } from "../hooks/useShop";

const Header = () => {
  const { userDetails, loading } = useAuth();
  const { setSearchTerm } = useShop();
  const navigate = useNavigate();
  if (loading) {
    return;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    e.target.search.value = "";
    navigate("/shop");
  };
  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <i className="fa-brands fa-shopify text-4xl text-primary"></i>
          <h1 className="text-2xl font-medium font">Gift Haven</h1>
        </div>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex justify-center w-full max-w-xl relative "
        >
          <span className="absolute left-4 md:left-16 lg:left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full md:w-1/2 lg:w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
          />
          <button
            type="submit"
            className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <div className="text-2xl">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {userDetails?.wishlist?.length || 0}
            </div>
          </div>
          <div className="text-center text-gray-700 hover:text-primary transition relative">
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {userDetails?.cart?.length || 0}
            </div>
          </div>
          <NavLink
            to="/dashboard"
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-user"></i>
            </div>
            <div className="text-xs leading-3">Dashboard</div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
