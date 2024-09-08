// import Header from "components/header";
import Menu from "components/menu";
import { Outlet } from "react-router-dom";
// import styles
import "./layout.scss";
function LayoutMenu(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <Menu />
        </div>
        <main className="col-12 col-md-8 col-lg-9">
          <div className="height-content p-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutMenu;
