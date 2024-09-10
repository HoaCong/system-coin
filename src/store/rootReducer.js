/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import bankAccountReducer from "./BankAccount/reducer";
import changePasswordReducer from "./ChangePassword/reducer";
import coinReducer from "./Coin/reducer";
import customerReducer from "./Customer/reducer";
import guireReducer from "./Guire/reducer";
import loginReducer from "./Login/reducer";
import newsReducer from "./News/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  customerReducer,
  bankAccountReducer,
  loginReducer,
  toastReducer,
  changePasswordReducer,
  guireReducer,
  newsReducer,
  coinReducer,
});

export default rootReducer;
