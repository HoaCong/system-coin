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

export const getMethodPayment = (params) => ({
  type: ActionTypes.METHOD_PAYMENT,
  params,
});

export const getMethodPaymentSuccess = (payload) => ({
  type: ActionTypes.METHOD_PAYMENT_SUCCESS,
  payload,
});

export const getMethodPaymentFailed = (error) => ({
  type: ActionTypes.METHOD_PAYMENT_FAILED,
  error,
});

export const getDetailOrder = (params) => ({
  type: ActionTypes.DETAIL_ORDER,
  params,
});

export const getDetailOrderSuccess = (payload) => ({
  type: ActionTypes.DETAIL_ORDER_SUCCESS,
  payload,
});

export const getDetailOrderFailed = (error) => ({
  type: ActionTypes.DETAIL_ORDER_FAILED,
  error,
});

export const actionWithDrawOrder = (params) => ({
  type: ActionTypes.WITHDRAW_ORDER,
  params,
});

export const actionWithDrawOrderSuccess = (payload) => ({
  type: ActionTypes.WITHDRAW_ORDER_SUCCESS,
  payload,
});

export const actionWithDrawOrderFailed = (error) => ({
  type: ActionTypes.WITHDRAW_ORDER_FAILED,
  error,
});

export const getHistoriesWithDraw = (params) => ({
  type: ActionTypes.HISTORIES_WITHDRAW,
  params,
});

export const getHistoriesWithDrawSuccess = (payload) => ({
  type: ActionTypes.HISTORIES_WITHDRAW_SUCCESS,
  payload,
});

export const getHistoriesWithDrawFailed = (error) => ({
  type: ActionTypes.HISTORIES_WITHDRAW_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
