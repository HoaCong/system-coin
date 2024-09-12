import * as ActionTypes from "./constant";

export const actionAdd = (params) => ({
  type: ActionTypes.ADD,
  params,
});

export const actionAddSuccess = (payload) => ({
  type: ActionTypes.ADD_SUCCESS,
  payload,
});

export const actionAddFailed = (error) => ({
  type: ActionTypes.ADD_FAILED,
  error,
});

export const actionEdit = (params) => ({
  type: ActionTypes.EDIT,
  params,
});

export const actionEditSuccess = (payload) => ({
  type: ActionTypes.EDIT_SUCCESS,
  payload,
});

export const actionEditFailed = (error) => ({
  type: ActionTypes.EDIT_FAILED,
  error,
});

export const actionEditBank = (params) => ({
  type: ActionTypes.EDIT_BANK,
  params,
});

export const actionEditBankSuccess = (payload) => ({
  type: ActionTypes.EDIT_BANK_SUCCESS,
  payload,
});

export const actionEditBankFailed = (error) => ({
  type: ActionTypes.EDIT_BANK_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});
