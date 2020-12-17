import { combineReducers } from "redux";
import snackbar from "./snackbar.reducer";

const boxReducers = combineReducers({
  snackbar,
});

export default boxReducers;
