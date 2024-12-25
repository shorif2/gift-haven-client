import { useEffect, useState } from "react";
import SellerShopCard from "../components/SellerShopCard";
import useAuth from "../hooks/useAuth";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import Loading from "../pages/Loading";

const AllProduct = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const res = await useAxiosBaseUrl.get("/my-products", {
        params: { email: user.email },
      });
      setProduct(res.data);
      setLoading(false);
    };
    if (user?.email) {
      fetchProduct();
    }
  }, [user?.email]);

  return (
    <div>
      <h1 className="pb-10">My Product</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product?.map((pro) => (
            <SellerShopCard key={pro._id} product={pro} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
