import { combineReducers } from "redux";
import property from "./property.reducer";
import offers from "./offers.reducer";
import bids from "./bids.reducer";
import boxpiles from "./boxpiles.reducer";

const propertyReducers = combineReducers({
  property,
  offers,
  boxpiles,
  bids,
});

export default propertyReducers;
