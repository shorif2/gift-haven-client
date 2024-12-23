import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import UserDashHome from "../userDashboard/UserDashHome";
import AddProduct from "../userDashboard/AddProduct";
import Wishlist from "../userDashboard/Wishlist";
import Cart from "../userDashboard/Cart";
import AllProduct from "../userDashboard/AllProduct";
import AllUsers from "../userDashboard/AllUsers";
import PrivetRouter from "../privetRoute/PrivetRouter";
import ErrorPage from "../pages/ErrorPage";
import ProductDetails from "../pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      {
        path: "/shop",
        element: <Shop />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/product-details/", element: <ProductDetails /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout />
      </PrivetRouter>
    ),
    children: [
      { path: "/dashboard", element: <UserDashHome /> },
      {
        path: "/dashboard/product",
        element: <AllProduct />,
      },
      {
        path: "/dashboard/manage-product",
        element: <AddProduct />,
      },
      { path: "/dashboard/wishlist", element: <Wishlist /> },
      { path: "/dashboard/all-users", element: <AllUsers /> },
      { path: "/dashboard/cart", element: <Cart /> },
    ],
  },
]);

export default router;
