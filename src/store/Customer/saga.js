import { ENDPOINT } from "constants/routerApi";
import { POST, PUT } from "helper/ajax";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionUpdateUserLogin } from "store/Login/action";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionEditBankFailed,
  actionEditBankSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionEditWalletFailed,
  actionEditWalletSuccess,
  actionSendContactFailed,
  actionSendContactSuccess,
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
    const { id, phone, full_name, image } = params;
    const response = yield call(PUT, ENDPOINT.UPDATE_USER + id, {
      phone,
      full_name,
      image,
    });

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        actionUpdateUserLogin({
          phone,
          full_name,
          image,
        })
      );
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

function* callApiEditBank({ params }) {
  try {
    const { id, ...resParams } = params;
    const response = yield call(PUT, ENDPOINT.UPDATE_BANKING(id), resParams);

    if (response.status === 200) {
      yield put(actionEditBankSuccess(response.data.data));
      yield put(actionUpdateUserLogin(resParams));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditBankFailed());
      yield put(
        addToast({
          text: "Update bank failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditBankFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update bank failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEditWallet({ params }) {
  try {
    const { id, wallet_pi, wallet_sidra } = params;
    const [response, response_2] = yield all([
      call(PUT, ENDPOINT.UPDATE_WALLET_PI(id), { wallet_pi }),
      call(PUT, ENDPOINT.UPDATE_WALLET_SIDRA(id), { wallet_sidra }),
    ]);
    if (response.status === 200 && response_2.status === 200) {
      yield put(actionEditWalletSuccess(response.data.data));
      yield put(actionUpdateUserLogin({ wallet_pi, wallet_sidra }));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditWalletFailed());
      yield put(
        addToast({
          text: "Update wallet failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditWalletFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update wallet failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiSendContact({ params }) {
  try {
    const response = yield call(POST, ENDPOINT.SEND_CONTACT, params);
    if (response.status === 200) {
      yield put(actionSendContactSuccess(response.data.data));
      yield put(
        addToast({
          text: "Gửi liên hệ thành công",
          type: "success",
          title: "",
          life: 10000,
        })
      );
    } else {
      yield put(actionSendContactFailed());
      yield put(
        addToast({
          text: "Gửi liên hệ thất bại",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionSendContactFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Gửi liên hệ thất bại",
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
    yield takeLatest(ActionTypes.EDIT_BANK, callApiEditBank),
    yield takeLatest(ActionTypes.EDIT_WALLET, callApiEditWallet),
    yield takeLatest(ActionTypes.SEND_CONTACT, callApiSendContact),
  ]);
}
