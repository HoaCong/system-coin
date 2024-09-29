import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  listStatus: { ...status },
  actionStatus: { ...status },
  list: [],
  histories: {
    list: [],
    status,
    params: { limit: 10, page: 1 },
    total: 0,
  },
  withdraw: {
    list: [],
    status,
    params: { limit: 10, page: 1 },
    total: 0,
  },
  detailOrder: {
    data: {},
    message: "",
    status,
  },
  payment: {},
  paymentStatus: status,
};

const coinReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.listStatus.isLoading = true;
        draft.listStatus.isSuccess = false;
        draft.listStatus.isFailure = false;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.listStatus.isLoading = false;
        draft.listStatus.isSuccess = true;
        draft.list = action.payload.data;
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.list = [];
        break;

      case ActionTypes.CREATE_ORDER:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        draft.detailOrder.data = {};
        draft.detailOrder.message = "";
        break;

      case ActionTypes.CREATE_ORDER_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.detailOrder.data = action.payload.order_coin;
        draft.detailOrder.message = action.payload.message;
        break;

      case ActionTypes.CREATE_ORDER_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.HISTORIES_ORDER:
        draft.histories.status.isLoading = true;
        draft.histories.status.isSuccess = false;
        draft.histories.status.isFailure = false;
        draft.histories.params = action.params;
        break;

      case ActionTypes.HISTORIES_ORDER_SUCCESS:
        draft.histories.status.isLoading = false;
        draft.histories.status.isSuccess = true;
        draft.histories.list = action.payload.data;
        draft.histories.total = action.payload.total;
        break;

      case ActionTypes.HISTORIES_ORDER_FAILED:
        draft.histories.status.isLoading = false;
        draft.histories.status.isFailure = true;
        draft.histories.total = 0;
        break;

      case ActionTypes.METHOD_PAYMENT:
        draft.paymentStatus.isLoading = true;
        draft.paymentStatus.isSuccess = false;
        draft.paymentStatus.isFailure = false;
        break;

      case ActionTypes.METHOD_PAYMENT_SUCCESS:
        draft.paymentStatus.isLoading = false;
        draft.paymentStatus.isSuccess = true;
        draft.payment = action.payload.data;
        break;

      case ActionTypes.METHOD_PAYMENT_FAILED:
        draft.paymentStatus.isLoading = false;
        draft.paymentStatus.isFailure = true;
        draft.payment = {};
        break;

      case ActionTypes.DETAIL_ORDER:
        draft.detailOrder.status.isLoading = true;
        draft.detailOrder.status.isSuccess = false;
        draft.detailOrder.status.isFailure = false;
        break;

      case ActionTypes.DETAIL_ORDER_SUCCESS:
        draft.detailOrder.status.isLoading = false;
        draft.detailOrder.status.isSuccess = true;
        draft.detailOrder.data = action.payload.order;
        break;

      case ActionTypes.DETAIL_ORDER_FAILED:
        draft.detailOrder.status.isLoading = false;
        draft.detailOrder.status.isFailure = true;
        draft.detailOrder.data = {};
        break;

      case ActionTypes.WITHDRAW_ORDER:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.WITHDRAW_ORDER_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        break;

      case ActionTypes.WITHDRAW_ORDER_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.HISTORIES_WITHDRAW:
        draft.withdraw.status.isLoading = true;
        draft.withdraw.status.isSuccess = false;
        draft.withdraw.status.isFailure = false;
        draft.withdraw.params = action.params;
        break;

      case ActionTypes.HISTORIES_WITHDRAW_SUCCESS:
        draft.withdraw.status.isLoading = false;
        draft.withdraw.status.isSuccess = true;
        draft.withdraw.list = action.payload.data;
        draft.withdraw.total = action.payload.total;
        break;

      case ActionTypes.HISTORIES_WITHDRAW_FAILED:
        draft.withdraw.status.isLoading = false;
        draft.withdraw.status.isFailure = true;
        draft.withdraw.total = 0;
        break;

      case ActionTypes.RESET_DATA:
        draft.listStatus = { ...status };
        draft.actionStatus = { ...status };
        draft.histories = {
          list: [],
          status,
          params: { limit: 10, page: 1 },
          total: 0,
        };
        draft.detailOrder = {
          data: {},
          status,
        };
        draft.paymentStatus = status;
        break;

      default:
        return state;
    }
  });
};

export default coinReducer;
