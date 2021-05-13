import { combineReducers, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import trilog from "redux/modules/trilog";
import Sidebar from "redux/modules/sidebar";
import Profile from "redux/modules/profile";
import User from "redux/modules/user";
import Thrils from "redux/modules/trils";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  trilog: trilog,
  sidebar: Sidebar,
  profile: Profile,
  user: User,
  trils: Thrils,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument({ history: history }), logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
