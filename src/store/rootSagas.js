/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import changePasswordSaga from "./ChangePassword/saga";
import loginSaga from "./Login/saga";
export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(changePasswordSaga),
    //
  ]);
}
