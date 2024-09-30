import { ENDPOINT } from "constants/routerApi";
import { GET } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import {
  actionGetDetailFailed,
  actionGetDetailSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.LIST_GUIRE, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiDetail({ params }) {
  try {
    const response = yield call(GET, ENDPOINT.GUIRE_DETAIL(params));
    if (response.status === 200) {
      yield put(actionGetDetailSuccess(response.data));
    } else {
      yield put(actionGetDetailFailed());
    }
  } catch (error) {
    yield put(actionGetDetailFailed(error.response.data.error));
  }
}

export default function* newsSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLeading(ActionTypes.DETAIL, callApiDetail),
  ]);
}
