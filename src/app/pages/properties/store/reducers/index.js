import { combineReducers } from "redux";
import property from "./property.reducer";
import offers from "./offers.reducer";
import bids from "./bids.reducer";

const propertyReducers = combineReducers({
  property,
  offers,
  bids,
});

export default propertyReducers;
