/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";
import bankAccountSaga from "./BankAccount/saga";
import changePasswordSaga from "./ChangePassword/saga";
import coinSaga from "./Coin/saga";
import customerSaga from "./Customer/saga";
import guireSaga from "./Guire/saga";
import loginSaga from "./Login/saga";
import newsSaga from "./News/saga";
export default function* rootSaga() {
  yield all([
    fork(customerSaga),
    fork(loginSaga),
    fork(changePasswordSaga),
    fork(bankAccountSaga),
    fork(coinSaga),
    fork(newsSaga),
    fork(guireSaga),
  ]);
}
