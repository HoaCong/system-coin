// import Header from "components/header";
import Menu from "components/menu";
import { Outlet } from "react-router-dom";
// import styles
import "./layout.scss";
function LayoutMenu(props) {
  return (
    <div className="container">
      <div className="d-flex">
        <Menu />
        <main className="w-100">
          <div className="height-content p-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutMenu;
