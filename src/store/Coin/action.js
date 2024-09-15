import * as ActionTypes from "./constant";

export const actionGetList = (params) => ({
  type: ActionTypes.LIST,
  params,
});

export const actionGetListSuccess = (payload) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload,
});

export const actionGetListFailed = (error) => ({
  type: ActionTypes.LIST_FAILED,
  error,
});

export const actionCreateOrder = (params) => ({
  type: ActionTypes.CREATE_ORDER,
  params,
});

export const actionCreateOrderSuccess = (payload) => ({
  type: ActionTypes.CREATE_ORDER_SUCCESS,
  payload,
});

export const actionCreateOrderFailed = (error) => ({
  type: ActionTypes.CREATE_ORDER_FAILED,
  error,
});

export const getHistoriesOrder = (params) => ({
  type: ActionTypes.HISTORIES_ORDER,
  params,
});

export const getHistoriesOrderSuccess = (payload) => ({
  type: ActionTypes.HISTORIES_ORDER_SUCCESS,
  payload,
});

export const getHistoriesOrderFailed = (error) => ({
  type: ActionTypes.HISTORIES_ORDER_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
