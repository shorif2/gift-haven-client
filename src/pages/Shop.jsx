import Breadcrumb from "../components/Shop/Breadcrumb";
import Drawer from "../components/Shop/Drawer";
import DrawerToggle from "../components/Shop/DrawerToggle";
import SideBar from "../components/Shop/SideBar";
import ShopCard from "../components/ShopCard";
import useUserData from "../hooks/useUserData";
import Pagination from "../components/Shop/Pagination";
import { useShop } from "../hooks/useShop";

const Shop = () => {
  const { products, loading } = useShop();
  const userData = useUserData();
  return (
    <>
      <Breadcrumb />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerToggle />
        {<Drawer />}
        <SideBar />
        {loading ? (
          <div className="col-span-3">
            <div className="flex justify-center">Loading...</div>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Shop;
