import { ENDPOINT } from "constants/routerApi";
import { POST, PUT } from "helper/ajax";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionUpdateUserLogin } from "store/Login/action";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionEditFailed,
  actionEditSuccess,
} from "./action";
import * as ActionTypes from "./constant";

function* callApiAdd({ params }) {
  try {
    const response = yield call(POST, ENDPOINT.REGISTER, params);
    if (response.status === 200) {
      yield put(actionAddSuccess(response.data.data));
      yield put(
        addToast({
          text: "Đăng ký tài khoản thành công",
          type: "success",
          title: "",
          life: 10000,
        })
      );
    } else {
      yield put(actionAddFailed());
      yield put(
        addToast({
          text: "Đăng ký tài khoản thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Đăng ký tài khoản thất bại",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id, email, phone, full_name, password, image, ref_email } = params;
    const response = yield call(PUT, ENDPOINT.UPDATE_USER + id, {
      // email,
      phone,
      full_name,
      image,
      // password,
      // ref_email,
    });

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      yield put(actionEditSuccess(response.data.data));
      yield put(actionUpdateUserLogin(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Update customer failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update customer failed",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* customerSaga() {
  yield all([
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
  ]);
}
