import { useShop } from "../../hooks/useShop";
import ShopCard from "../ShopCard";

const NewArrival = () => {
  const { products } = useShop();
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.slice(0, 4).map((product) => (
          <ShopCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
