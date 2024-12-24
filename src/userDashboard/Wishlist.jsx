import { useEffect, useState } from "react";
import WishlistCart from "../components/Buyer/WishlistCart";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const Wishlist = () => {
  const { userDetails, loading } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fectchCart = async () => {
      await useAxiosBaseUrl
        .get("/wishlist-list", {
          params: { productIds: JSON.stringify(userDetails?.wishlist) },
        })
        .then((res) => {
          setWishlist(res.data);
        });
    };
    fectchCart();
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
      <div className="grid md:gird-cols-2 grid-cols-3 gap-4">
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
