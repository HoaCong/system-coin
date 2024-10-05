import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  loginStatus: {
    ...status,
  },
  registerStatus: {
    ...status,
  },
  data: {
    access_token: localStorage.getItem("access_token") || "",
    user: JSON.parse(localStorage.getItem("user")),
    timeExpired: localStorage.getItem("time_expired") || 0,
    error: "",
  },
};

const loginReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LOGIN:
        draft.loginStatus.isLoading = true;
        draft.loginStatus.isSuccess = false;
        draft.loginStatus.isFailure = false;
        break;

      case ActionTypes.LOGIN_SUCCESS:
        draft.loginStatus.isLoading = false;
        draft.loginStatus.isSuccess = true;
        draft.data = { ...action.payload, user: action.payload.customer };
        break;

      case ActionTypes.LOGIN_FAILED:
        draft.loginStatus.isLoading = false;
        draft.loginStatus.isFailure = true;
        draft.data = {
          access_token: "",
          timeExpired: 0,
          user: {},
          error: "Tài khoản hoặc mật khẩu không đúng",
        };
        break;

      case ActionTypes.LOGOUT: {
        draft.loginStatus = { ...status };
        draft.data = {
          access_token: "",
          timeExpired: 0,
          error: "",
          user: {},
        };
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        localStorage.removeItem("role_id");
        localStorage.removeItem("id");
        localStorage.removeItem("time_expired");
        break;
      }

      case ActionTypes.REGISTER:
        draft.registerStatus.isLoading = true;
        draft.registerStatus.isSuccess = false;
        draft.registerStatus.isFailure = false;
        break;

      case ActionTypes.REGISTER_SUCCESS:
        draft.registerStatus.isLoading = false;
        draft.registerStatus.isSuccess = true;
        break;

      case ActionTypes.REGISTER_FAILED:
        draft.registerStatus.isLoading = false;
        draft.registerStatus.isFailure = true;
        draft.data = {
          access_token: "",
          user: {},
          timeExpired: 0,
          error: action.error,
        };
        break;

      case ActionTypes.UPDATE_USER_LOGIN:
        const newData = { ...state.data.user, ...action.data };
        draft.data.user = newData;
        localStorage.setItem("user", JSON.stringify(newData));
        break;

      case ActionTypes.CLEAR_ERROR:
        draft.data.error = "";
        break;

      case ActionTypes.MINUS_COUNT_CHECK:
        draft.data.user.count_check_current =
          state.data.user.count_check_current - 1;
        break;

      case ActionTypes.GET_INFO:
        draft.loginStatus.isLoading = true;
        draft.loginStatus.isSuccess = false;
        draft.loginStatus.isFailure = false;
        break;

      case ActionTypes.GET_INFO_SUCCESS:
        draft.loginStatus.isLoading = false;
        draft.loginStatus.isSuccess = true;
        draft.data.user = action.payload.data;
        break;

      case ActionTypes.GET_INFO_FAILED:
        draft.loginStatus.isLoading = false;
        draft.loginStatus.isFailure = true;
        draft.data = {
          access_token: "",
          timeExpired: 0,
          user: {},
          error: "",
        };
        break;

      default:
        return state;
    }
  });
};

export default loginReducer;
