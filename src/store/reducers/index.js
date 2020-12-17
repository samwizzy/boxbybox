import { combineReducers } from "redux";
import box from "./box";
import auth from "../../auth/store/reducers";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    box,
    ...asyncReducers,
  });

export default createReducer;
