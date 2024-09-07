import DefaultLayout from "components/layout/DefaultLayout";
import AdminLayout from "components/layout/LayoutMenu";
import { ROUTES } from "constants/routerWeb";
import ChangePassword from "pages/ChangePassword";
import GuireSection from "pages/Guire";
import Histories from "pages/Histories";
import Home from "pages/Home";
import Login from "pages/Login";
import NewsSection from "pages/News";
import PageNotFound from "pages/NotFoundPage";
import ProfileInfo from "pages/ProfileInfo";
import Register from "pages/Register";
import Wallet from "pages/Wallet";

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "Default Layout",
    element: <DefaultLayout />,
    children: [
      { isRoot: true, name: "Home", element: <Home /> },
      {
        path: ROUTES.NEWS,
        name: "NewsSection",
        element: <NewsSection />,
      },
      {
        path: ROUTES.GUIRE,
        name: "GuireSection",
        element: <GuireSection />,
      },
      {
        path: ROUTES.PROFILE,
        name: "ProfileSection",
        element: <AdminLayout />,
        children: [
          { isRoot: true, name: "ChangePassword", element: <ChangePassword /> },
          {
            path: ROUTES.INFO,
            name: "ProfileInfo",
            element: <ProfileInfo />,
          },
          {
            path: ROUTES.WALLET,
            name: "Wallet",
            element: <Wallet />,
          },
          {
            path: ROUTES.HISTORIES,
            name: "Histories",
            element: <Histories />,
          },
          {
            path: ROUTES.CHANGE_PASSWORD,
            name: "ChangePassword",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    name: "LOGIN",
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    name: "REGISTER",
    element: <Register />,
  },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];
