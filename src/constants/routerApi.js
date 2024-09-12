export const ENDPOINT = {
  LOGIN: "/api/customer/login",
  REGISTER: "api/customer/create",
  UPDATE_USER: "api/customer/",
  CHANGE_PASSWORD: "api/customer/changepassword/",
  // BANK ACCOUNT
  UPDATE_BANKING: (id) => `api/customer/banking/${id}`,
  // ======news======
  LIST_NEWS: "api/new",
  // ======guires======
  LIST_GUIRE: "api/guidline",
  LIST_COIN: "api/coin",
};
