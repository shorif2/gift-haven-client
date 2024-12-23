import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Copywrite from "../components/Copywrite";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
      <Copywrite />
    </>
  );
};

export default HomeLayout;
