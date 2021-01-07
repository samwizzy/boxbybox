import { combineReducers } from "redux";
import location from "./location.reducer";
import user from "./user.reducer";
import login from "./login.reducer";
import register from "./register.reducer";

const authReducers = combineReducers({
  location,
  user,
  login,
  register,
});

export default authReducers;
