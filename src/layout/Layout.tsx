import { Outlet } from "react-router-dom";
import UserHeader from "../components/Header";

const Layout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
};

export default Layout;
