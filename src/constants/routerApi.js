export const ENDPOINT = {
  LOGIN: "/api/customer/login",
  REGISTER: "api/customer/create",
  UPDATE_USER: "api/customer/",
  CHANGE_PASSWORD: "api/customer/changepassword/",
  LIST_BANK: (id) => `api/banking/${id}`,
  ADD_BANK: "api/banking/create",
  DELETE_BANK: (id) => `api/banking/${id}`,
};
