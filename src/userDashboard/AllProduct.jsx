import { useEffect, useState } from "react";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useAuth from "../hooks/useAuth";
import SellerShopCard from "../components/SellerShopCard";
import Loading from "../pages/Loading";

const AllProduct = () => {
  const { user, loading } = useAuth();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fectchProdut = async () => {
      const res = await useAxiosBaseUrl.get("/my-products", {
        params: { email: user.email },
      });
      setProduct(res.data);
    };
    if (user?.email) {
      fectchProdut();
    }
  }, [user?.email]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="pb-10">My Product</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product?.map((pro) => (
          <SellerShopCard key={pro._id} product={pro} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
