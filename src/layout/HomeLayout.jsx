import { Outlet } from "react-router-dom";
import Copywrite from "../components/Copywrite";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
      <Copywrite />
    </div>
  );
};

export default HomeLayout;
