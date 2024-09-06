/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import changePasswordReducer from "./ChangePassword/reducer";
import loginReducer from "./Login/reducer";
import toastReducer from "./Toast/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  changePasswordReducer,
  //
});

export default rootReducer;
