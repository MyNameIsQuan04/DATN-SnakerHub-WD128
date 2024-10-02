import { Outlet } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../footer/footer";

const LayoutClient = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutClient;
