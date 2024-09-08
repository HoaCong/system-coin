/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import bankAccountSaga from "./BankAccount/saga";
import changePasswordSaga from "./ChangePassword/saga";
import customerSaga from "./Customer/saga";
import loginSaga from "./Login/saga";
export default function* rootSaga() {
  yield all([
    fork(customerSaga),
    fork(loginSaga),
    fork(changePasswordSaga),
    fork(bankAccountSaga),
    //
  ]);
}
