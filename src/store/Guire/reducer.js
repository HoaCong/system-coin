import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  listStatus: { ...status },
  actionStatus: { ...status },
  list: [],
  detail: {},
  detailStatus: { ...status },
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const guireReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.listStatus.isLoading = true;
        draft.listStatus.isSuccess = false;
        draft.listStatus.isFailure = false;
        draft.params.page = action.params.page;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.listStatus.isLoading = false;
        draft.listStatus.isSuccess = true;
        draft.list = action.payload.data;
        draft.meta.total = action.payload.total;
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.list = [];
        break;

      case ActionTypes.DETAIL:
        draft.detailStatus.isLoading = true;
        draft.detailStatus.isSuccess = false;
        draft.detailStatus.isFailure = false;
        break;

      case ActionTypes.DETAIL_SUCCESS:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isSuccess = true;
        draft.detail = action.payload.data;
        break;

      case ActionTypes.DETAIL_FAILED:
        draft.detailStatus.isLoading = false;
        draft.detailStatus.isFailure = true;
        draft.detail = {};
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default guireReducer;
