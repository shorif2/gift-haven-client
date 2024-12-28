import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "../components/Buyer/ShoppingCart";
import useAuth from "../hooks/useAuth";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import Loading from "../pages/Loading";

const Cart = () => {
  const { userDetails } = useAuth();
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await useAxiosBaseUrl.get("/cart-list", {
          params: { userId: userDetails?._id },
        });
        setCartItem(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userDetails?._id) {
      fetchCart();
    }
  }, [userDetails?._id]);

  const handleRemoveCart = (id) => {
    setCartItem((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item._id !== id),
    }));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        {!cartItem?.products?.length ? (
          <div>
            <h1 className="pb-4 text-lg font-medium">
              You have no item in cart
            </h1>
            <Link
              to="/shop"
              className="border px-3 py-1  bg-primary text-white rounded"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Shopping Cart ({cartItem?.products?.length})
            </h2>
            {cartItem?.products?.map((cart) => (
              <ShoppingCart
                key={cart?._id}
                cartItem={cart}
                userId={userDetails._id}
                onRemove={handleRemoveCart}
              />
            ))}

            <div className="space-y-4">
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-base text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p className="font-semibold">${cartItem?.totalPrice || 0}</p>
                </div>
                <div className="flex justify-between text-base text-gray-500 mb-4">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                  <p>Total</p>
                  <p>${cartItem?.totalPrice || 0}</p>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
