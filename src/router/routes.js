import AdminLayout from "components/layout/AdminLayout";
import DefaultLayout from "components/layout/DefaultLayout";
import { ROUTES } from "constants/routerWeb";
import AdminChangePassword from "pages/Admin/ChangePassword";
import AdminDashboard from "pages/Admin/Dashboard";
import AdminEmployee from "pages/Admin/Employee";
import AdminGuire from "pages/Admin/Guire";
import AdminNews from "pages/Admin/News";
import GuireSection from "pages/Guire";
import Home from "pages/Home";
import Login from "pages/Login";
import NewsSection from "pages/News";
import PageNotFound from "pages/NotFoundPage";
import Register from "pages/Register";

export const EnumHome = {
  ADMIN: ROUTES.ADMIN_HOME_PAGE,
  EMPLOYEE: ROUTES.ADMIN_HOME_PAGE,
};

export const adminRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <AdminDashboard /> },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        name: "Dashboard Page",
        element: <AdminDashboard />,
      },
      {
        path: ROUTES.ADMIN_EMPLOYEE,
        name: "Employee Page",
        element: <AdminEmployee />,
      },
      {
        path: ROUTES.ADMIN_CHANGEPASSWORD,
        name: "Change Password Page",
        element: <AdminChangePassword />,
      },
      {
        path: ROUTES.ADMIN_NEWS,
        name: "News Page",
        element: <AdminNews />,
      },
      {
        path: ROUTES.ADMIN_GUIRE,
        name: "Guire Page",
        element: <AdminGuire />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const managerRoutes = [];

export const userRoutes = [];

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
