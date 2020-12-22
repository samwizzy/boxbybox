import { combineReducers } from "redux";
import home from "./home.reducer";

const homeReducers = combineReducers({
  home,
});

export default homeReducers;
