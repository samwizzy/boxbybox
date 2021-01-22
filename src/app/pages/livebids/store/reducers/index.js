import { combineReducers } from "redux";
import bids from "./bids.reducer";

const bidsReducers = combineReducers({
  bids,
});

export default bidsReducers;
