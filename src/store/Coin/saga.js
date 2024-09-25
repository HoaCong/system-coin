import { ENDPOINT } from "constants/routerApi";
import { GET, POST } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionCreateOrderFailed,
  actionCreateOrderSuccess,
  actionGetListFailed,
  actionGetListSuccess,
  getDetailOrderFailed,
  getDetailOrderSuccess,
  getHistoriesOrderFailed,
  getHistoriesOrderSuccess,
  getMethodPaymentFailed,
  getMethodPaymentSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.LIST_COIN, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiCreateOrder({ params }) {
  try {
    const response = yield call(POST, ENDPOINT.CREATE_ORDER, params);

    if (response.status === 200) {
      yield put(actionCreateOrderSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionCreateOrderFailed());
      yield put(
        addToast({
          text: "Tạo hóa đơn thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionCreateOrderFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Tạo hóa đơn thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}
function* callApiHistoriesOrder({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.HISTORY_ORDER, params);

    if (response.status === 200) {
      yield put(getHistoriesOrderSuccess(response.data));
    } else {
      yield put(getHistoriesOrderFailed());
    }
  } catch (error) {
    yield put(getHistoriesOrderFailed(error.response.data.error));
  }
}
function* callApiMethodPayment({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.PAYMENT, params);

    if (response.status === 200) {
      yield put(getMethodPaymentSuccess(response.data));
    } else {
      yield put(getMethodPaymentFailed());
    }
  } catch (error) {
    yield put(getMethodPaymentFailed(error.response.data.error));
  }
}
function* callApiDetailOrder({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.DETAIL_ORDER, params);

    if (response.status === 200) {
      yield put(getDetailOrderSuccess(response.data));
    } else {
      yield put(getDetailOrderFailed());
    }
  } catch (error) {
    yield put(getDetailOrderFailed(error.response.data.error));
  }
}

export default function* coinSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.CREATE_ORDER, callApiCreateOrder),
    yield takeLatest(ActionTypes.HISTORIES_ORDER, callApiHistoriesOrder),
    yield takeLatest(ActionTypes.METHOD_PAYMENT, callApiMethodPayment),
    yield takeLatest(ActionTypes.DETAIL_ORDER, callApiDetailOrder),
  ]);
}
