import { combineReducers } from "redux";
import home from "./home.reducer";
import property from "./property.reducer";
import news from "./../../../news/store/reducers/news.reducer";

const homeReducers = combineReducers({
  home,
  property,
  news,
});

export default homeReducers;
