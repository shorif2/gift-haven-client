import { Outlet } from "react-router-dom";
import CopyWrite from "../components/CopyWrite";
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
      <CopyWrite />
    </div>
  );
};

export default HomeLayout;
