import { combineReducers } from "redux";
import property from "./property.reducer";
import offers from "./offers.reducer";
import bids from "./bids.reducer";
import ipostakes from "./ipo_stakes.reducer";

const propertyReducers = combineReducers({
  property,
  offers,
  ipostakes,
  bids,
});

export default propertyReducers;
