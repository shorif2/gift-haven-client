import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistCart from "../components/Buyer/WishlistCart";
import useAuth from "../hooks/useAuth";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import Loading from "../pages/Loading";

const Wishlist = () => {
  const { userDetails } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await useAxiosBaseUrl.get("/wishlist-list", {
          params: { userId: userDetails?._id },
        });
        setWishlist(res.data);
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
  const handleRemoveWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="font-medium">Wishlist</h1>
      <>
        {!wishlist.length && (
          <>
            <div className="flex justify-center items-center  w-full h-1/2">
              <div className="flex flex-col justify-center">
                <h1 className="pb-4 text-lg font-medium">
                  You have no item in wishlist
                </h1>
                <Link
                  to="/shop"
                  className="border px-3 py-1 w-fit  bg-primary text-white rounded"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </>
        )}
        <div className="mx-auto space-y-4 max-w-6xl">
          {wishlist.map((wishlist) => (
            <WishlistCart
              key={wishlist._id}
              wishlistItem={wishlist}
              userId={userDetails._id}
              onRemove={handleRemoveWishlist}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default Wishlist;
