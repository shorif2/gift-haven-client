import Ads from "../components/Home/Ads";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import Features from "../components/Home/Features";
import NewArrival from "../components/Home/NewArrival";
import Product from "../components/Home/Product";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Product />
    </>
  );
};

export default Home;
