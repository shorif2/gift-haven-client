import { useEffect, useState } from "react";
import WishlistCart from "../components/Buyer/WishlistCart";
import useUserData from "../hooks/useUserData";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";

const Wishlist = () => {
  const userData = useUserData();
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fectchCart = async () => {
      await useAxiosBaseUrl
        .get("/wishlist-list", {
          params: { productIds: JSON.stringify(userData?.wishlist) },
        })
        .then((res) => {
          setWishlist(res.data);
        });
    };
    fectchCart();
  }, [userData?.wishlist]);
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
            userId={userData._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
