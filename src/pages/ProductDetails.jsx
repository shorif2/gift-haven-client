import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Description from "../components/ProductDetails/Description";
import ProductDetailsSection from "../components/ProductDetails/ProductDetailsSection";
import Breadcrumb from "../components/Shop/Breadcrumb";
import ShopCard from "../components/ShopCard";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProuduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await useAxiosBaseUrl.get("/single-product", {
          params: { id: productId },
        });
        console.log(response);
        setProuduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);
  console.log(productId);
  return (
    <>
      <Breadcrumb />
      <ProductDetailsSection product={product} />
      <Description />
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
