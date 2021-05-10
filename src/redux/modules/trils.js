import { createSlice } from "@reduxjs/toolkit";

const access_token = localStorage.getItem("access_token");
const refresh_token = localStorage.getItem("refresh_token");

const trilseSlice = createSlice({
  name: "trils",
  initialState: {
    data: [],
  },
  reducers: {
    TRILS: (state, action) => {
      state.data = action.payload;
    },
  },
});

const trils = () => {
  return function (dispatch, getState, { history }) {
    console.log(access_token);
    const URL =
      "http://13.209.8.146/api/all/posts?page=${pageNum}&filter={filterName}&keyword={keyword}";
    const API = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Token": `${access_token}`,
      },
      // body: JSON.stringify({
      //   email: email,
      //   password: pwd,
      //   passwordCheck: pwdcheck,
      //   nickname: nickname,
      // }),
    };
    fetch(URL, API).then().catch();
  };
};

export const { TRILS } = trilseSlice.actions;

export const TrilsActions = {
  trils,
};

export default trilseSlice.reducer;
