import DefaultLayout from "components/layout/DefaultLayout";
import { ROUTES } from "constants/routerWeb";
import GuireSection from "pages/Guire";
import Home from "pages/Home";
import Login from "pages/Login";
import NewsSection from "pages/News";
import PageNotFound from "pages/NotFoundPage";
import Register from "pages/Register";

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
