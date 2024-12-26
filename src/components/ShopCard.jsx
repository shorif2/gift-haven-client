import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import ProductRatings from "./ProductRatings";

const ShopCard = ({ product, userId }) => {
  const { userDetails, setLoading } = useAuth();
  const {
    _id,
    name,
    description,
    price,
    quantity,
    category,
    colors,
    ratings,
    sellerEmail,
    image,
  } = product || "";

  const handleCartAdd = async (id, action) => {
    if (!userId) {
      toast.error("please login first");
      return;
    }
    setLoading(true);

    const res = await useAxiosBaseUrl.put("/manage-cart", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      toast.success("Item added to cart");
      setLoading(false);
    } else if (res.data.modifiedCount === 0) {
      toast.error("Item already added");
      setLoading(false);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleWishlist = async (id, action) => {
    if (!userId) {
      toast.error("please login first");
      return;
    }
    setLoading(true);
    const res = await useAxiosBaseUrl.put("/manage-wishlist", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      setLoading(false);
      toast.success("Item added to wishlist");
    } else if (res.data.modifiedCount === 0) {
      setLoading(false);
      toast.error("Item already wishlist");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <div className="bg-gray-100 h-64 w-full flex items-center justify-center">
          {product?.image[0] ? (
            <img
              src={product?.image[0]}
              alt={product?.name || "image unavailable"}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="flex place-content-center">Image not available</p>
          )}
        </div>
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
            justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            to={`/product-details/?id=${product?._id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <button
            onClick={() => handleWishlist(_id, "add")}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <div>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {name}
          </h4>
        </div>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">${price}</p>
          <p className="text-sm text-gray-400 line-through">
            ${Math.ceil(price + 1)}
          </p>
        </div>
        <div className="flex items-center">
          <ProductRatings rating={ratings} />
          <div className="text-xs text-gray-500 ml-3">({ratings})</div>
        </div>
      </div>
      <button
        onClick={() => handleCartAdd(_id, "add")}
        disabled={
          userDetails?.role === "seller" || userDetails?.role === "admin"
        } // Correctly handle both roles
        title={
          userDetails?.role === "seller" || userDetails?.role === "admin"
            ? "Sellers and admins are not allowed to add to cart"
            : ""
        }
        className={`block w-full py-1 text-center text-white bg-primary border border-primary rounded-b transition ${
          userDetails?.role === "seller" || userDetails?.role === "admin"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-transparent hover:text-primary"
        }`}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ShopCard;
