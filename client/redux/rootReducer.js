import { combineReducers } from "redux";
import { navReducer } from "./nav/reducer/nav.reducers";

export const rootReducer = combineReducers({
  nav: navReducer
});
