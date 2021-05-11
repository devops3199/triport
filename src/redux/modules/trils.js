import { createSlice } from "@reduxjs/toolkit";

const trilseSlice = createSlice({
  name: "trils",
  initialState: {
    data: [],
    modal: false,
    detail: [],
    page: 1,
  },
  reducers: {
    GET_POST: (state, action) => {
      state.data = action.payload.result;
      state.page = action.payload.page;
    },
    SHIFT_POST: (state, action) => {
      state.data.push(...action.payload.result);
      state.page = action.payload.page;
    },
    GET_POST_DETAIL: (state, action) => {
      state.modal = true;
      state.detail = action.payload;
    },
    CLOSE_MODAL: (state, action) => {
      state.modal = false;
    },
    LIKE_OK: (state, action) => {
      const idx = state.data.findIndex(
        (p) => p.information.id === action.payload.information.id
      );
      state.data[idx] = action.payload;
      state.detail = action.payload;
    },
    DELETE_POST: (state, action) => {
      const idx = state.data.findIndex(
        (p) => p.information.id === action.payload
      );
      if (idx !== -1) {
        state.data.splice(idx, 1);
      }
    },
  },
});

const writepost = (video, tags) => {
  return function (dispatch, getState, { history }) {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    let formData = new FormData();
    formData.append("file", video);
    tags.map((p, idx) => formData.append("hashtag", p));
    const url = "http://13.209.8.146/api/posts";
    const data = {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.msg === "포스팅 완료!") {
          alert("정상적으로 작성되었습니다.");
          history.replace("/");
        }
      })
      .catch((err) => console.log(err));
  };
};

const getPost = (keyword = "", LikeOrDate = "modifiedAt", page = 1) => {
  return function (dispatch, getState, { history }) {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    const url = `http://13.209.8.146/api/all/posts?page=${page}&filter=${LikeOrDate}&keyword=${keyword}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
        };
        if (page === 1) {
          dispatch(GET_POST(results));
        } else {
          dispatch(SHIFT_POST(results));
        }
      })
      .catch((err) => console.log(err));
  };
};

const getPostDetail = (postId) => {
  return function (dispatch, getState, { history }) {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    const url = `http://13.209.8.146/api/all/posts/detail/${postId}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        dispatch(GET_POST_DETAIL(result.results));
      })
      .catch((err) => console.log(err));
  };
};

const send_like = (postId, like) => {
  return function (dispatch, getState, { history }) {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    const url = `http://13.209.8.146/api/posts/like/${postId}`;
    const data = {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.ok) {
          dispatch(LIKE_OK(result.results));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const {
  GET_POST,
  SHIFT_POST,
  GET_POST_DETAIL,
  CLOSE_MODAL,
  LIKE_OK,
  DELETE_POST,
} = trilseSlice.actions;

export const TrilsActions = {
  writepost,
  getPost,
  getPostDetail,
  send_like,
};

export default trilseSlice.reducer;
