import { ROUTES } from "./routerWeb";

export const MENU_PROFILE = [
  {
    label: "Thông tin cá nhân",
    active: false,
    src: ROUTES.INFO,
    icon: <i className="fas fa-user"></i>,
  },
  {
    label: "Tài khoản ngân hàng",
    active: false,
    src: ROUTES.BANK_ACCOUNT,
    icon: <i className="fas fa-money-check-alt"></i>,
  },
  {
    label: "Ví của tôi",
    active: false,
    src: ROUTES.WALLET,
    icon: <i className="fas fa-wallet"></i>,
  },
  {
    label: "Lịch sử giao dịch",
    active: false,
    src: ROUTES.HISTORIES,
    icon: <i className="fas fa-clock"></i>,
  },
  {
    label: "Đổi mật khẩu",
    active: false,
    src: ROUTES.CHANGE_PASSWORD,
    icon: <i className="fas fa-lock"></i>,
  },
];
