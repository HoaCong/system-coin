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
        break;

      case ActionTypes.CREATE_ORDER_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
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

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default coinReducer;
