import { Outlet } from "react-router-dom";

// Core Components
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNav";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNavBar />
    </>
  );
};

export default Layout;
