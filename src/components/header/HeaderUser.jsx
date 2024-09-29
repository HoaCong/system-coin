import LazyLoadImage from "components/common/LazyLoadImage";
import { ROUTES } from "constants/routerWeb";
import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { actionLogout, getInfo } from "store/Login/action";
import AvatarDefault from "../../assets/images/avatar.png";
import Logo from "../../assets/images/logo.jpg";
import "./header.scss";
import "./index.scss";
function Header({ menuIcon, children }) {
  const location = useLocation();
  const {
    data: { user },
    loginStatus: { isLoading },
  } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const onGetInfo = (body) => dispatch(getInfo(body));
  const onLogout = () => dispatch(actionLogout());

  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    onLogout();
  };

  const handleLoadUser = () => {
    onGetInfo(user?.id);
  };

  const InfoLogin = (
    <>
      {user?.id ? (
        <>
          <div
            className="d-flex align-items-center gap-1"
            style={{ caretColor: "transparent" }}
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="tooltip-refresh">Làm mới số dư coin</Tooltip>
              }
            >
              {isLoading ? (
                <div
                  className="spinner-border text-white"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              ) : (
                <i
                  className="fas fa-sync-alt fw-bold text-white cursor-pointer"
                  onClick={handleLoadUser}
                ></i>
              )}
            </OverlayTrigger>

            <Nav.Link
              className={`px-0 mx-2 text-uppercase text-white text-12`}
              onClick={() => setIsActive((prev) => !prev)}
            >
              <div className="d-flex align-items-center gap-1">
                <LazyLoadImage
                  src={user.image}
                  width={25}
                  height={25}
                  imgDefault={AvatarDefault}
                  className="rounded-3"
                />
                <span>{user?.full_name}</span>
              </div>
            </Nav.Link>
          </div>
          <div
            onClick={() => setIsActive((prev) => !prev)}
            className="account-header d-flex gap-2 align-items-center"
          >
            <ul
              className={`${
                !isActive ? "d-none" : ""
              } sub-menu-account list-unstyled`}
            >
              <div className="d-flex">
                {["PI_NETWORD", "SIDRA"].map((coinType, index) => (
                  <div
                    key={coinType}
                    className={`px-2 text-center  cursor-pointer fw-bold w-50 ${
                      index === 0
                        ? "bg-warning text-white"
                        : "bg-light text-warning"
                    }`}
                  >
                    <div> {index === 0 ? "π PI" : "$ SIDRA"}</div>
                    <div className="overflow-auto hide-scrollbar">
                      {index === 0 ? user?.picoin || 0 : user?.sidracoin || 0}
                    </div>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.INFO}>
                <li>
                  <i className="fas fa-user me-2"></i>
                  Thông tin cá nhân
                </li>
              </Link>
              <Link to={ROUTES.BANK_ACCOUNT}>
                <li>
                  <i className="fas fa-money-check-alt me-2"></i>
                  Tài khoản ngân hàng
                </li>
              </Link>
              <Link to={ROUTES.WALLET}>
                <li>
                  <i className="fas fa-wallet me-2"></i>
                  Ví tiền
                </li>
              </Link>
              <Link to={ROUTES.HISTORIES}>
                <li>
                  <i className="fas fa-clock me-2"></i>
                  Lịch sử giao dịch
                </li>
              </Link>
              <Link to={ROUTES.HISTORIES_WITHDRAW}>
                <li>
                  <i className="fas fa-clock me-2"></i>
                  Lịch sử rút coin
                </li>
              </Link>
              <Link to={ROUTES.CHANGE_PASSWORD}>
                <li>
                  <i className="fas fa-unlock-alt me-2"></i>
                  Đổi mật khẩu
                </li>
              </Link>
              <Link>
                <li onClick={handleLogout} className="last_item">
                  <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                </li>
              </Link>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Nav.Link
            as={Link}
            to="/login"
            className={`px-0 mx-2 text-uppercase text-white text-12 ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            <i className="fas fa-sign-in-alt me-1"></i>Đăng nhập
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/register"
            className={`px-0 mx-2 text-uppercase text-white text-12 ${
              location.pathname === "/register" ? "active" : ""
            }`}
          >
            <i className="fas fa-user-plus me-1"></i>Đăng ký
          </Nav.Link>
        </>
      )}
    </>
  );

  return (
    <div id="header" className="position-sticky top-0" style={{ zIndex: 3 }}>
      <Navbar expand="lg" className="py-0 h-60px">
        <Container>
          <Navbar.Brand href="/">
            <LazyLoadImage
              src={Logo}
              width={50}
              height={50}
              alt="logo"
              className="rounded-circle"
              onClick={() => {}}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="mobile-nav"
            className="shadow-none bg-white"
          />
          <Nav className="ms-auto p-2 gap-2 desktop_menu">
            <Nav.Link
              as={Link}
              to="/"
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Trang chủ
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.SEARCH_TRANSACTION}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/link" ? "active" : ""
              }`}
            >
              Đơn hàng của tôi
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.NEWS}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/news" ? "active" : ""
              }`}
            >
              Tin tức
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.GUIRE}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/guire" ? "active" : ""
              }`}
            >
              Hướng dẫn
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.CONTACT}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Liên hệ
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.HOLD_COIN}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/holding_coin" ? "active" : ""
              }`}
            >
              Cầm coin
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={ROUTES.WITHDRAW_COIN}
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/withdraw_coin" ? "active" : ""
              }`}
            >
              Rút coin
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto p-2 gap-2 desktop_menu">{InfoLogin}</Nav>
          <Navbar.Collapse id="mobile-nav">
            <Nav className="ms-auto p-2 gap-2">
              <Nav.Link
                as={Link}
                to="/"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Trang chủ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.SEARCH_TRANSACTION}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/link" ? "active" : ""
                }`}
              >
                Đơn hàng của tôi
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.NEWS}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/news" ? "active" : ""
                }`}
              >
                Tin tức
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.GUIRE}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/guire" ? "active" : ""
                }`}
              >
                Hướng dẫn
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.CONTACT}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Liên hệ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.HOLD_COIN}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/holding_coin" ? "active" : ""
                }`}
              >
                Cầm coin
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={ROUTES.WITHDRAW_COIN}
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/withdraw_coin" ? "active" : ""
                }`}
              >
                Rút coin
              </Nav.Link>
              {InfoLogin}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
