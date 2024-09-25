import DefaultLayout from "components/layout/DefaultLayout";
import AdminLayout from "components/layout/LayoutMenu";
import { MENU_MANAGER, MENU_PROFILE } from "constants/routerMenu";
import { ROUTES } from "constants/routerWeb";
import BankAccount from "pages/BankAccount";
import ChangePassword from "pages/ChangePassword";
import Contact from "pages/Contact";
import GuireSection from "pages/Guire";
import Histories from "pages/Histories";
import HoldPi from "pages/HoldPi";
import Home from "pages/Home";
import Login from "pages/Login";
import NewsSection from "pages/News";
import PageNotFound from "pages/NotFoundPage";
import ProfileInfo from "pages/ProfileInfo";
import QuestionAnswer from "pages/QuestionAnswer";
import Register from "pages/Register";
import SearchTransaction from "pages/SearchTransaction";
import Wallet from "pages/Wallet";

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "Default Layout",
    element: <DefaultLayout />,
    children: [
      { isRoot: true, name: "Home", element: <Home /> },
      {
        path: ROUTES.SEARCH_TRANSACTION,
        name: "SearchTransaction",
        element: <SearchTransaction />,
      },
      {
        path: ROUTES.PROFILE,
        name: "ProfileSection",
        element: <AdminLayout menu={MENU_PROFILE} name="profile" />,
        children: [
          { isRoot: true, name: "ProfileInfo", element: <ProfileInfo /> },
          {
            path: ROUTES.INFO,
            name: "ProfileInfo",
            element: <ProfileInfo />,
          },
          {
            path: ROUTES.BANK_ACCOUNT,
            name: "BankAccount",
            element: <BankAccount />,
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
      {
        path: ROUTES.MENU,
        name: "Menu Section",
        element: <AdminLayout menu={MENU_MANAGER} name="menu" />,
        children: [
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
            path: ROUTES.QUESTION_ANSWER,
            name: "QuestionAnswer",
            element: <QuestionAnswer />,
          },
          {
            path: ROUTES.CONTACT,
            name: "Contact",
            element: <Contact />,
          },
          {
            path: ROUTES.HOLD_PI,
            name: "HoldPi",
            element: <HoldPi />,
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
