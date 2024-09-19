/* eslint-disable react-hooks/exhaustive-deps */
import BtnSocials from "components/BtnSocials";
import ImagePopup from "components/common/ImagePopup";
import ToastSnackbar from "components/common/ToastSnackbar";
import { checkTimeExpired } from "helper/functions";
import CheckTokenMiddleware from "middleware/checkToken";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "router";
import { actionGetList } from "store/Coin/action";
import { getInfo } from "store/Login/action";
import "./index.scss";

function App() {
  const {
    data: { access_token, timeExpired, user },
  } = useSelector((state) => state.loginReducer);
  const { popup } = useSelector((state) => state.toastReducer);
  const {
    listStatus: { isLoading },
    list,
  } = useSelector((state) => state.coinReducer);

  const dispatch = useDispatch();
  const onGetListCoin = (body) => dispatch(actionGetList(body));
  const onGetInfo = (body) => dispatch(getInfo(body));

  useEffect(() => {
    if (!isLoading && !list?.length) onGetListCoin({ limit: 2, page: 1 });
    if (access_token && !checkTimeExpired(timeExpired) && user?.id) {
      onGetInfo(user?.id);
    }
  }, []);

  const renderRoutes = useCallback((routes) => {
    return routes?.map((route, index) => {
      if (route.children?.length > 0) {
        return (
          <Route path={route.path} element={route.element} key={index}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      if (route.isRoot) {
        return <Route index element={route.element} key={index} />;
      }
      return <Route path={route.path} element={route.element} key={index} />;
    });
  }, []);

  return (
    <>
      <CheckTokenMiddleware>
        <Routes>{renderRoutes(publicRoutes)}</Routes>
      </CheckTokenMiddleware>
      <ToastSnackbar />
      {popup?.visible && <ImagePopup />}
      <BtnSocials />
    </>
  );
}

export default App;
