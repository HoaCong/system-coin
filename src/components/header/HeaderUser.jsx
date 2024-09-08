import LazyLoadImage from "components/common/LazyLoadImage";
import { ROUTES } from "constants/routerWeb";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { actionLogout } from "store/Login/action";
import AvatarDefault from "../../assets/images/avatar.png";
import Logo from "../../assets/images/logo.jpg";
import "./header.scss";
import "./index.scss";
function Header({ menuIcon, children }) {
  const location = useLocation();
  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionLogout());

  const [isActive, setIsActive] = useState(false);
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div id="header">
      <Navbar expand="lg" className="py-0 h-60px">
        <Container>
          <Navbar.Brand href="/">
            <LazyLoadImage
              src={Logo}
              width={50}
              height={50}
              alt="logo"
              className="rounded-circle"
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
              to="/link"
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/link" ? "active" : ""
              }`}
            >
              Tra cứu giao dịch
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/news" ? "active" : ""
              }`}
            >
              Tin tức
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/guire"
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/guire" ? "active" : ""
              }`}
            >
              Chỉ dẫn
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              Liên hệ
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto p-2 gap-2 desktop_menu">
            {user?.id ? (
              <>
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
                <div className=" d-flex justify-content-end align-items-center gap-4 mx-1 ms-auto">
                  <div
                    onClick={() => setIsActive((prev) => !prev)}
                    className="account-header d-flex gap-2 align-items-center"
                  >
                    <ul
                      className={`${
                        !isActive ? "d-none" : ""
                      } sub-menu-account list-unstyled`}
                    >
                      <li>
                        <Link to={ROUTES.INFO}>
                          <i className="fas fa-user me-2"></i>
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.WALLET}>
                          <i className="fas fa-wallet me-2"></i>
                          Ví tiền
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.HISTORIES}>
                          <i className="fas fa-clock me-2"></i>
                          Lịch sử giao dịch
                        </Link>
                      </li>
                      <li>
                        <Link to={ROUTES.CHANGE_PASSWORD}>
                          <i className="fas fa-unlock-alt me-2"></i>
                          Đổi mật khẩu
                        </Link>
                      </li>
                      <li onClick={handleLogout}>
                        <Link>
                          <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
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
          </Nav>
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
                to="/link"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/link" ? "active" : ""
                }`}
              >
                Tra cứu giao dịch
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/news"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/news" ? "active" : ""
                }`}
              >
                Tin tức
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/guire"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/guire" ? "active" : ""
                }`}
              >
                Chỉ dẫn
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`px-0 mx-2 text-uppercase text-white text-12 fw-bold ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Liên hệ
              </Nav.Link>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
