import { createSlice } from "@reduxjs/toolkit";

const refresh_token = localStorage.getItem("refresh_token");

const trilseSlice = createSlice({
  name: "trils",
  initialState: {
    data: [],
    modal: false,
  },
  reducers: {
    GET_POST: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

const writepost = (video, tags) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    let formData = new FormData();
    formData.append("file", video);
    tags.map((p, idx) => formData.append("hashtag", p));
    const URL = "http://13.209.8.146/api/posts";
    const API = {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    };
    fetch(URL, API)
      .then((result) => {
        return result.json();
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
};

const getPost = (token) => {
  return function (dispatch, getState, { history }) {
    const URL = `http://13.209.8.146/api/all/posts?page=1&filter=modifiedAt&keyword=`;
    const API = {
      method: "GET",
      // headers: {
      //   Authorization: `${access_token}`,
      // },
    };
    fetch(URL, API)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        console.log(result);
        dispatch(GET_POST(result.results));
      })
      .catch((err) => console.log(err));
  };
};

export const { GET_POST } = trilseSlice.actions;

export const TrilsActions = {
  writepost,
  getPost,
};

export default trilseSlice.reducer;
