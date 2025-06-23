import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Root;
