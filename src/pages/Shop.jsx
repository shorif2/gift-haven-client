import { useEffect, useState } from "react";
import Breadcrumb from "../components/Shop/Breadcrumb";
import Drawer from "../components/Shop/Drawer";
import DrawerToggle from "../components/Shop/DrawerToggle";
import SideBar from "../components/Shop/SideBar";
import ShopCard from "../components/shopCard";
import useAxiosBaseUrl from "../hooks/useAxiosBaseUrl";
import useUserData from "../hooks/useUserData";
import Pagination from "../components/Shop/Pagination";

const Shop = () => {
  const userData = useUserData();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      useAxiosBaseUrl
        .get(
          `/all-products?name=${searchTerm}&sort=${sort}&category=${category}`
        )
        .then((res) => {
          setProducts(res.data);
        });
    };
    fetchProduct();
    console.log(searchTerm);
  }, [category, searchTerm, sort]);

  return (
    <>
      <Breadcrumb />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerToggle />
        <Drawer />
        <SideBar
          setSearchTerm={setSearchTerm}
          setSort={setSort}
          setCategory={setCategory}
        />
        <div className="col-span-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ShopCard
                key={product._id}
                product={product}
                userId={userData?._id}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Shop;
