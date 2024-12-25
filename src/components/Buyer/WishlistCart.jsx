import toast from "react-hot-toast";
import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";
import ProductRatings from "../ProductRatings";

const WishlistCart = ({ wishlistItem, userId }) => {
  const { _id } = wishlistItem;
  const handleCartAdd = async (id, action) => {
    if (!userId) {
      toast.error("please going first");
      return;
    }
    const res = await useAxiosBaseUrl.put("/manage-cart", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      toast.success("Item added to cart");
    } else if (res.data.modifiedCount === 0) {
      toast.error("Item already added");
    } else {
      toast.error("Something went wrong");
    }
  };
  const handleWishlist = async (id, action) => {
    if (!userId) {
      toast.error("please going first");
      return;
    }
    const res = await useAxiosBaseUrl.put("/manage-wishlist", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      console.log(res.data);
      toast.success("Item remove from wishlist");
    } else if (res.data.modifiedCount === 0) {
      toast.error("Item already remove");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <div className="bg-gray-100 h-64 w-full flex items-center justify-center">
          {wishlistItem?.image[0] ? (
            <img
              src={wishlistItem?.image[0]}
              alt={wishlistItem?.name || "image unavailable"}
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
          <div
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <button
            // onClick={() => handleWishlist(_id, "add")}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <a href="#">
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {wishlistItem?.name}
          </h4>
        </a>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${wishlistItem?.price}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${Math.ceil(wishlistItem?.price + 1)}
          </p>
        </div>
        <div className="flex items-center">
          <ProductRatings rating={wishlistItem?.ratings} />
          <div className="text-xs text-gray-500 ml-3">
            ({wishlistItem?.ratings} )
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleWishlist(_id, "remove")}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Remove
        </button>
        <button
          onClick={() => handleCartAdd(_id, "add")}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCart;
