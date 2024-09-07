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
    if (access_token && checkTimeExpired(timeExpired)) {
      onLogout();
    }
    if (isLoginPage && access_token && !checkTimeExpired(timeExpired)) {
      return navigate(ROUTES.HOME_PAGE);
    }
  }, [access_token, pathname]);

  return children;
};

export default CheckTokenMiddleware;
