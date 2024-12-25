import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";

const SellerShopCard = ({ product }) => {
  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("access-token");
    const res = await useAxiosBaseUrl.delete(`/product?id=${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.deletedCount) {
      toast.success(`${product?.name} deleted`);
    }
  };
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <div className="bg-gray-100 h-64 w-full flex items-center justify-center">
          {product?.image[0] ? (
            <img
              src={product?.image[0]}
              alt="product 1"
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
          <div
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link to={`/product-details/?id=${product?._id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {product?.name}
          </h4>
          <h5>{product?.description.slice(0, 40)}...</h5>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${product?.price}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product?.price + 10}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
            <span>
              <i className="fa-solid fa-star"></i>
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">(150)</div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            handleDeleteProduct(product?._id);
          }}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Delete
        </button>
        <Link
          to={`/dashboard/manage-product?id=${product?._id}`}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          Update
        </Link>
      </div>
    </div>
  );
};

export default SellerShopCard;
