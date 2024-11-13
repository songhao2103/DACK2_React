import ScrollToTop from "./scrollToTop/ScrollToTop";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
// import Breadcrumb from "./breadcrumb/Breadcrumb";
const AppContent = () => {
  return (
    <>
      <Header></Header>
      {/* <Breadcrumb></Breadcrumb> */}
      <ScrollToTop></ScrollToTop>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default AppContent;
