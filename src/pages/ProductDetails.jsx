import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Shop/Breadcrumb";
import ProductDetailsSection from "../components/ProductDetails/ProductDetailsSection";
import Description from "../components/ProductDetails/Description";
import ShopCard from "../components/ShopCard";
import { useSearchParams } from "react-router-dom";
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
        <div className="grid grid-cols-4 gap-6">
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
