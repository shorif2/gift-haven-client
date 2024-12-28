import toast from "react-hot-toast";
import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";

const WishlistCart = ({ wishlistItem, userId, onRemove }) => {
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
    const res = await useAxiosBaseUrl.put("/manage-wishlist", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      onRemove(id);
      toast.success("Item remove from wishlist");
    } else if (res.data.modifiedCount === 0) {
      toast.error("Item already remove");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
        <div className="w-28 h-24 border">
          {wishlistItem?.image[0] ? (
            <img
              src={wishlistItem?.image[0]}
              alt={wishlistItem?.name || "image unavailable"}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="flex justify-center items-center">
              Image not available
            </p>
          )}
        </div>
        <div className="w-1/3">
          <h2 className="text-gray-800 text-xl font-medium uppercase">
            {wishlistItem?.name}
          </h2>
          <p className="text-gray-500 text-sm">
            Availability: <span className="text-green-600">In Stock</span>
          </p>
        </div>
        <div className="text-primary text-lg font-semibold">
          ${wishlistItem?.price}
        </div>
        <button
          onClick={() => handleCartAdd(_id, "add")}
          className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          add to cart
        </button>

        <button
          onClick={() => handleWishlist(_id, "remove")}
          className="text-gray-600 cursor-pointer hover:text-primary"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default WishlistCart;
