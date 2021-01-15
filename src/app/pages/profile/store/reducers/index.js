import { combineReducers } from "redux";
import profile from "./profile.reducer";
import property from "./property.reducer";
import wallet from "./wallet.reducer";
import listing from "./listing.reducer";

const profileReducers = combineReducers({
  profile,
  property,
  wallet,
  listing,
});

export default profileReducers;
