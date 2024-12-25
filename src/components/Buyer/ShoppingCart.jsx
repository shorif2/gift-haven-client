import toast from "react-hot-toast";
import useAxiosBaseUrl from "../../hooks/useAxiosBaseUrl";

const ShoppingCart = ({ cartItem, userId }) => {
  const handleRemoveCart = async (id, action) => {
    const res = await useAxiosBaseUrl.put("/manage-cart", {
      productId: id,
      userId: userId,
      action: action,
    });
    if (res.data.modifiedCount) {
      toast.success("Item remove from cart");
    } else if (res.data.modifiedCount === 0) {
      toast.error("Item already remove");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <img
        src={cartItem?.image[0]}
        alt={cartItem?.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{cartItem?.name}</h3>
        <p className="text-sm text-gray-500">Size: M, Color: Black</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-gray-500 hover:text-gray-700">-</button>
        <span className="w-8 text-center">1</span>
        <button className="text-gray-500 hover:text-gray-700">+</button>
      </div>
      <p className="font-semibold text-gray-900 w-20 text-right">
        ${cartItem?.price}
      </p>
      <button
        onClick={() => {
          handleRemoveCart(cartItem._id, "remove");
        }}
        className="text-gray-400 hover:text-red-500"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ShoppingCart;
