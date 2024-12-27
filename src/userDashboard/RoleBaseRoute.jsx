import {
  PlusCircle,
  ShoppingCartSimple,
  ThreadsLogo,
  UsersThree,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleBaseRoute = () => {
  const { userDetails } = useAuth();
  const route = {
    buyer: [
      {
        id: 1,
        routeName: "Wishlist",
        routeLink: "/dashboard/wishlist",
        icon: <i className="fa-regular fa-heart"></i>,
      },
      {
        id: 2,
        routeName: "Cart",
        routeLink: "/dashboard/cart",
        icon: <ShoppingCartSimple size={20} />,
      },
    ],
    seller: [
      {
        id: 3,
        routeName: "Add Product",
        routeLink: "/dashboard/manage-product",
        icon: <PlusCircle size={20} />,
      },
      {
        id: 4,
        routeName: "All Product",
        routeLink: "/dashboard/product",
        icon: <ThreadsLogo size={20} />,
      },
    ],
    admin: [
      {
        id: 5,
        routeName: "All Users",
        routeLink: "/dashboard/all-users",
        icon: <UsersThree size={20} />,
      },
    ],
  };
  return (
    <>
      {route[userDetails?.role]?.map((route) => (
        <Link
          key={route.id}
          className="border flex gap-2 justify-start items-center p-3 text-center hover:border-primary rounded"
          to={route.routeLink}
        >
          {route?.icon}
          {route?.routeName}
        </Link>
      ))}
    </>
  );
};

export default RoleBaseRoute;
