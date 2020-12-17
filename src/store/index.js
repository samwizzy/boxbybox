import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createReducer from "./reducers";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(createReducer(), enhancer);

/**
 * Type: function
 * Tool: Redux replaceReducer
 * Dependent: withReducer
 * Description: manually inject component reducers when mounted
 * rather than have all reducers passed into store, it gets passed only when component is visited
 * */

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
