import { useEffect, useState } from "react";
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
      await useAxiosBaseUrl
        .get("/wishlist-list", {
          params: { productIds: JSON.stringify(userDetails?.wishlist) },
        })
        .then((res) => {
          setWishlist(res.data);
          setLoading(false);
        });
    };
    fetchCart();
  }, [userDetails?.wishlist]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Wishlist</h1>
      {!wishlist.length && (
        <>
          <h1>No Item in wishlist</h1>
        </>
      )}
      <div className="mx-auto space-y-4 max-w-6xl">
        {wishlist.map((wishlist) => (
          <WishlistCart
            key={wishlist._id}
            wishlistItem={wishlist}
            userId={userDetails._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
