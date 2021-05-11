import { combineReducers, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import board from "redux/modules/board";
import Sidebar from "redux/modules/sidebar";
import ProfileImg from "redux/modules/profileimg";
import user from "redux/modules/user";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  board: board,
  sidebar: Sidebar,
  profileimg: ProfileImg,
  user: user,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument({ history: history }), logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
