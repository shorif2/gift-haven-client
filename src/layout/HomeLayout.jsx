import { Outlet } from "react-router-dom";
import CopyWrite2 from "../components/CopyWrite2";
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
      <CopyWrite2 />
    </div>
  );
};

export default HomeLayout;
