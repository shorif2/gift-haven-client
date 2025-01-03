import Breadcrumb from "../components/Shop/Breadcrumb";
import Drawer from "../components/Shop/Drawer";
import DrawerToggle from "../components/Shop/DrawerToggle";
import Pagination from "../components/Shop/Pagination";
import SideBar from "../components/Shop/SideBar";
import ShopCard from "../components/ShopCard";
import useAuth from "../hooks/useAuth";
import { useShop } from "../hooks/useShop";
import Loading from "./Loading";

const Shop = () => {
  const { products, loading } = useShop();
  const { userDetails } = useAuth();
  return (
    <>
      <Breadcrumb />
      <div className="container min-h-fit grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <DrawerToggle />
        {<Drawer />}
        <SideBar />
        {loading ? (
          <div className="col-span-3">
            <div className="flex justify-center">
              <Loading />
            </div>
          </div>
        ) : (
          <div className="col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products?.map((product) => (
                <ShopCard
                  key={product._id}
                  product={product}
                  userId={userDetails?._id}
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
