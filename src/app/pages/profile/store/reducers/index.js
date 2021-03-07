import { combineReducers } from "redux";
import profile from "./profile.reducer";
import bids from "./bids.reducer";
import offers from "./offers.reducer";
import ipostakes from "./ipo-stakes.reducer";
import property from "./property.reducer";
import wallet from "./wallet.reducer";
import listing from "./listing.reducer";

const profileReducers = combineReducers({
  profile,
  bids,
  offers,
  ipostakes,
  property,
  wallet,
  listing,
});

export default profileReducers;
