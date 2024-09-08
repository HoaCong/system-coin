/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import bankAccountReducer from "./BankAccount/reducer";
import changePasswordReducer from "./ChangePassword/reducer";
import customerReducer from "./Customer/reducer";
import loginReducer from "./Login/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  customerReducer,
  bankAccountReducer,
  loginReducer,
  toastReducer,
  changePasswordReducer,
  //
});

export default rootReducer;
