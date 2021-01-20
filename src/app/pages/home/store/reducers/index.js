import { combineReducers } from "redux";
import home from "./home.reducer";
import property from "./property.reducer";

const homeReducers = combineReducers({
  home,
  property,
});

export default homeReducers;
