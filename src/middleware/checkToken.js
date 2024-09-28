/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { checkTimeExpired } from "helper/functions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { actionLogout } from "store/Login/action";

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
    const isAllowLogin_1 = [
      ROUTES.SEARCH_TRANSACTION,
      ROUTES.WITHDRAW_COIN,
    ].includes(pathname);
    if (access_token && checkTimeExpired(timeExpired)) {
      onLogout();
    }
    // nếu đang ở trang login và còn hiệu lực token
    if (isLoginPage && access_token && !checkTimeExpired(timeExpired)) {
      if (!isLoginPage && pathname !== ROUTES.HOME_PAGE) return;
      return navigate(ROUTES.HOME_PAGE);
    }
    // nếu hết hiệu lực và không ở trang HOME_PAGE thì về trang login
    if (
      (!access_token || checkTimeExpired(timeExpired)) &&
      (isAllowLogin || isAllowLogin_1)
    ) {
      if (isLoginPage) return;
      return navigate(ROUTES.LOGIN);
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
