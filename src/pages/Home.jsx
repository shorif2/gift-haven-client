import Ads from "../components/Home/Ads";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import Features from "../components/Home/Features";
import NewArrival from "../components/Home/NewArrival";
import Newsletter from "../components/Home/Newsletter";
import Product from "../components/Home/Product";
import Stats from "../components/Home/Stats";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const Home = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Product />
      <Stats />
      <Newsletter />
    </>
  );
};

export default Home;
