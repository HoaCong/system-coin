/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actionLogout } from "store/Login/action";
const checkTimeExpired = (timeExpired) => {
  const now = new Date().getTime();
  return now > timeExpired;
};

const CheckTokenMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actionLogout());
  const { pathname } = useLocation();
  const {
    data: { access_token, timeExpired, user },
  } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    // logic check token
    const isLoginPage = [ROUTES.LOGIN, ROUTES.REGISTER].includes(pathname);
    const isAllowLogin = pathname.includes(ROUTES.PROFILE);
    if (access_token && checkTimeExpired(timeExpired)) {
      onLogout();
    }
    // nếu đang ở trang login và còn hiệu lực token
    if (isLoginPage && access_token && !checkTimeExpired(timeExpired)) {
      if (!isLoginPage && pathname !== ROUTES.HOME_PAGE) return;
      return navigate(ROUTES.HOME_PAGE);
    }
    // nếu hết hiệu lực và không ở trang HOME_PAGE thì về trang login
    if ((!access_token || checkTimeExpired(timeExpired)) && isAllowLogin) {
      if (isLoginPage) return;
      return navigate(ROUTES.LOGIN);
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
