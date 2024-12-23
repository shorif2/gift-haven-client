import { createContext, useContext, useEffect, useState } from "react";
import ShopContext from "../hooks/useShop";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";

const ShopProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      useAxiosBaseUrl
        .get(
          `/all-products?name=${searchTerm}&sort=${sort}&category=${category}`
        )
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        });
    };
    fetchProduct();
  }, [category, searchTerm, sort]);

  return (
    <ShopContext.Provider
      value={{ products, setSearchTerm, setCategory, setSort, loading }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
