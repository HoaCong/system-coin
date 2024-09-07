import { ROUTES } from "./routerWeb";

export const MENU_PROFILE = [
  {
    label: "Thông tin cá nhân",
    active: false,
    src: ROUTES.INFO,
    icon: <i className="fas fa-lock"></i>,
  },
  {
    label: "Ví của tôi",
    active: false,
    src: ROUTES.WALLET,
    icon: <i className="fas fa-lock"></i>,
  },
  {
    label: "Lịch sử giao dịch",
    active: false,
    src: ROUTES.HISTORIES,
    icon: <i className="fas fa-lock"></i>,
  },
  {
    label: "Đổi mật khẩu",
    active: false,
    src: ROUTES.CHANGE_PASSWORD,
    icon: <i className="fas fa-lock"></i>,
  },
];
