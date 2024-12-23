import useUserData from "../hooks/useUserData";
import { Link } from "react-router-dom";

const RoleBaseRoute = () => {
  const user = useUserData();
  const route = {
    buyer: [
      {
        id: 1,
        routeName: "Wishlist",
        routeLink: "/dashboard/wishlist",
      },
      {
        id: 2,
        routeName: "Cart",
        routeLink: "/dashboard/cart",
      },
    ],
    seller: [
      {
        id: 3,
        routeName: "Add Product",
        routeLink: "/dashboard/manage-product",
      },
      {
        id: 4,
        routeName: "All Product",
        routeLink: "/dashboard/product",
      },
    ],
    admin: [
      {
        id: 5,
        routeName: "All Users",
        routeLink: "/dashboard/all-users",
      },
    ],
  };
  return (
    <>
      {route[user?.role]?.map((route) => (
        <Link
          key={route.id}
          className="border p-2 text-center hover:border-red-500"
          to={route.routeLink}
        >
          {route?.routeName}
        </Link>
      ))}
    </>
  );
};

export default RoleBaseRoute;
