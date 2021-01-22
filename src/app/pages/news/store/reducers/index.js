import { combineReducers } from "redux";
import news from "./news.reducer";

const newsReducers = combineReducers({
  news,
});

export default newsReducers;
