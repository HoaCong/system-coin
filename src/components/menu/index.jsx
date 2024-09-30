import useWindowSize from "components/common/useWindowSize";
import { formatCurrency } from "helper/functions";
import { useCallback, useState } from "react";
import { Accordion, useMediaQuery } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./menu.scss";
function Menu({ menu, type }) {
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const [list, setList] = useState(menu);
  const {
    listStatus: { isLoading, isSuccess, isFailure },
    list: listCoin,
  } = useSelector((state) => state.coinReducer);

  const { width: widthScreen } = useWindowSize();
  const [active, setActive] = useState(null);
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

  const handleAccordionClick = () => {
    setActive((prev) => (prev === "0" ? null : "0"));
  };
  const handleAccordionClose = () => {
    setActive(null);
  };

  const listMenu = (
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
                      <NavLink to={`${sub.src}`} onClick={handleAccordionClose}>
                        {sub.label}
                      </NavLink>
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
  );

  return (
    <div className="menu pt-3">
      {type === "profile" ? (
        <div className="">
          <div className="point_pi">
            Picoin: <span className="text-success">{user?.picoin || 0}</span>
          </div>
          <div className="point_pi">
            Sidracoin:{" "}
            <span className="text-success">{user?.sidracoin || 0}</span>
          </div>
        </div>
      ) : (
        <div className="mb-3 hideMobile">
          <div className="tt_sb">
            <strong className="t_tt_sb">Mua bán ℼ tại Tiệm</strong>
            <ul className="ul_tt_sb p-0 mb-0">
              <li>
                Giá bạn mua
                <div className="fs-6">
                  <strong>
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(listCoin[0]?.giaban || 0)}
                  </strong>
                </div>
              </li>
              <li>
                Giá bạn bán
                <div className="fs-6">
                  <strong>
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(listCoin[0]?.giamua || 0)}
                  </strong>
                </div>
              </li>
            </ul>
          </div>
          <div className="tt_sb">
            <strong className="t_tt_sb">Mua bán $ tại Tiệm</strong>
            <ul className="ul_tt_sb p-0 mb-0">
              <li>
                Giá bạn mua
                <div className="fs-6">
                  <strong>
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(listCoin[1]?.giaban || 0)}
                  </strong>
                </div>
              </li>
              <li>
                Giá bạn bán
                <div className="fs-6">
                  <strong>
                    {isLoading
                      ? "Loading..."
                      : formatCurrency(listCoin[1]?.giamua || 0)}
                  </strong>
                </div>
              </li>
            </ul>
          </div>
          <Link className="click_gd" to="/">
            Đến giao dịch
          </Link>
        </div>
      )}
      <>
        {widthScreen < 769 ? (
          <Accordion activeKey={active} onClick={handleAccordionClick}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5 className="mb-0 text-secondary">MENU</h5>
              </Accordion.Header>
              <Accordion.Body>{listMenu}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          <>
            <h5 className="mb-0 text-secondary">MENU</h5>
            {listMenu}
          </>
        )}
      </>
    </div>
  );
}

export default Menu;
