import { ENDPOINT } from "constants/routerApi";
import { GET } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionGetListFailed, actionGetListSuccess } from "./action";
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

export default function* guireSaga() {
  yield all([yield takeLeading(ActionTypes.LIST, callApiList)]);
}
