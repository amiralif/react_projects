import thunk from "redux-thunk";

import { createStore, applyMiddleware, compose } from "redux";

import reducers from "./reducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export * from "./action-creators/register";
export * from "./action-creators/movie";
export * from "./action-creators/login";

export default store;
