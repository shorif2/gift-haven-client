import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import HomeLayout from "../layout/HomeLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/Register";
import Shop from "../pages/Shop";
import PrivetRouter from "../privetRoute/PrivetRouter";
import AddProduct from "../userDashboard/AddProduct";
import AllProduct from "../userDashboard/AllProduct";
import AllUsers from "../userDashboard/AllUsers";
import Cart from "../userDashboard/Cart";
import UserDashHome from "../userDashboard/UserDashHome";
import Wishlist from "../userDashboard/Wishlist";

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
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      { path: "/dashboard/cart", element: <Cart /> },
    ],
  },
]);

export default router;
