import BtnSocials from "components/common/BtnSocials";
import Header from "components/header/HeaderUser";
import { Outlet } from "react-router-dom";
import "./layout.scss";
function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <BtnSocials />
    </>
  );
}

export default DefaultLayout;
