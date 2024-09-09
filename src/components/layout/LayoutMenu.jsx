// import Header from "components/header";
import Menu from "components/menu";
import { Outlet } from "react-router-dom";
// import styles
import "./layout.scss";
function LayoutMenu({ name, menu }) {
  return (
    <div className="container" key={name}>
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <Menu menu={menu} />
        </div>
        <main className="col-12 col-md-8 col-lg-9">
          <div className="height-content py-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LayoutMenu;
