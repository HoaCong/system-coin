import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./menu.scss";
function Menu({ menu, type }) {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const [list, setList] = useState(menu);

  const [prevIndex, setPrevIndex] = useState(0);
  const activeSubItem = useCallback(
    (index) => {
      const newList = [...list];

      if (prevIndex !== index) {
        newList[prevIndex].isVisible = false;
        newList[index].isVisible = true;
      } else {
        const isVisible = newList[index].isVisible;
        newList[index].isVisible = !isVisible;
      }
      setPrevIndex(index);
      setList(newList);
    },
    [list, prevIndex]
  );

  return (
    <div className="menu pt-3">
      {type === "profile" ? (
        <div className="">
          <div className="point_pi">
            Picoin: <span className="text-success">{user?.picoin || 0}</span>
          </div>
          <div className="point_pi">
            Sidracoin: <span className="text-success">{user?.picoin || 0}</span>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <div className="tt_sb">
            <strong className="t_tt_sb">Mua bán ℼ tại Tiệm</strong>
            <ul className="ul_tt_sb p-0 mb-0">
              <li>
                Giá bạn mua
                <div className="fs-6">
                  <strong>10 530đ </strong>
                </div>
              </li>
              <li>
                Giá bạn bán
                <div className="fs-6">
                  <strong>10 419đ </strong>
                </div>
              </li>
            </ul>
          </div>
          <Link className="click_gd" to="/">
            Đến giao dịch
          </Link>
        </div>
      )}
      <h5 className="mt-4 mb-0 text-secondary">MENU</h5>
      <ul className="d-flex flex-column gap-2 list-unstyled box-menu pt-2">
        {list.map((item, idx) => {
          if (item.sub) {
            return (
              <li key={idx}>
                <Link
                  className="d-flex align-items-center"
                  onClick={() => activeSubItem(idx)}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-center" style={{ width: "24px" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  {item.isVisible ? (
                    <i className="fas fa-chevron-up"></i>
                  ) : (
                    <i className="fas fa-chevron-down"></i>
                  )}
                </Link>
                <ul
                  className={`${
                    !item.isVisible ? "d-none" : "sub-menu"
                  } d-flex flex-column gap-2 list-unstyled mt-2 p-2`}
                >
                  {item.sub.map((sub, index) => {
                    return (
                      <li className="sub-list" key={index}>
                        <NavLink to={`${sub.src}`}>{sub.label}</NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }

          return (
            <li key={idx}>
              <NavLink to={`${item.src}`}>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-center" style={{ width: "24px" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
