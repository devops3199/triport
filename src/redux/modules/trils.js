import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";
import { logOut } from "./user";

const trilseSlice = createSlice({
  name: "trils",
  initialState: {
    data: [],
    modal: false,
    detail: {
      information: {
        id: 0,
        likeNum: 0,
        modifiedAt: "2021-05-20 00:00",
        videoType: "m3u8",
        videoUrl: "",
        posPlay: true,
        hashtag: ["트리포트"],
      },
      author: {
        nickname: "트리포트",
        profileImgUrl:
          "https://d1nogx3a73keco.cloudfront.net/video/about/tripper.jpg",
      },
      member: { isMembers: false, isLike: false },
    },
    page: 1,
    is_last: false,
  },
  reducers: {
    GET_POST: (state, action) => {
      state.data = action.payload.result;
      state.page = action.payload.page;
      state.is_last = action.payload.is_last;
    },
    SHIFT_POST: (state, action) => {
      state.data.push(...action.payload.result);
      state.page = action.payload.page;
      state.is_last = action.payload.is_last;
    },
    GET_POST_DETAIL: (state, action) => {
      state.modal = action.payload.modal;
      state.detail = action.payload.result;
    },
    MODAL_STATUS: (state, action) => {
      state.modal = action.payload;
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
    SEARCH_POST: (state, action) => {
      state.data = action.payload.result;
      state.page = action.payload.page;
      state.is_last = action.payload.is_last;
    },
    MEMBER_POST: (state, action) => {
      state.data = action.payload.result;
      state.page = action.payload.page;
      state.is_last = action.payload.is_last;
    },
    EDIT_POST: (state, action) => {
      const idx = state.data.findIndex(
        (p) => p.information.id === action.payload.id
      );
      state.data[idx].information.hashtag = action.payload.hashtag;
      state.detail.information.hashtag = action.payload.hashtag;
    },
    SET_TRILS_MYPOST: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Trils 마이 페이지 게시물 조회 - 마이 페이지 좋아요 조회
const getMyTrilsLikePost = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/posts/member/like`;

    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(SET_TRILS_MYPOST(data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Trils 마이 페이지 게시물 조회 - 마이 페이지 내가 쓴 글 조회
const getMyTrilsPost = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/posts/member`;

    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(SET_TRILS_MYPOST(data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Trils 해시태그 검색
const searchPost = (keyword = "", LikeOrDate = "likeNum", page = 1) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/all/posts?page=${page}&filter=${LikeOrDate}&keyword=${keyword}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
        };
        dispatch(SEARCH_POST(results));
      })
      .catch((err) => console.log(err));
  };
};

// Trils 멤버 포스트 검색
const memberpost = (memberId, LikeOrDate = "likeNum", page = 1) => {
  return function (dispatch, getState, { history }) {
    const api = `${config}/api/all/posts/member/${memberId}?page=${page}&filter=${LikeOrDate}`;
    const data = {
      method: "GET",
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
        };
        dispatch(MEMBER_POST(results));
      })
      .catch((err) => console.log(err));
  };
};

// 멤버 포스트 검색 무한스크롤
const memberpostOver = (memberId, LikeOrDate = "likeNum") => {
  return function (dispatch, getState, { history }) {
    const page = getState().trils.page;
    const api = `${config}/api/all/posts/member/${memberId}?page=${page}&filter=${LikeOrDate}`;
    const data = {
      method: "GET",
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
        };
        dispatch(SHIFT_POST(results));
      })
      .catch((err) => console.log(err));
  };
};

// Trils 포스트 불러오기
const setPost = (keyword = "", LikeOrDate = "likeNum", page = 1) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/all/posts?page=1&filter=${LikeOrDate}&keyword=${keyword}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
        };
        dispatch(GET_POST(results));
      })
      .catch((err) => console.log(err));
  };
};

// 무한스크롤
const getPost = (keyword = "", LikeOrDate = "likeNum") => {
  return function (dispatch, getState, { history }) {
    const page = getState().trils.page;
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/all/posts?page=${page}&filter=${LikeOrDate}&keyword=${keyword}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
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

// Trils 필터별 불러오기
const filterPost = (keyword = "", LikeOrDate = "likeNum", page = 1) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/all/posts?page=1&filter=${LikeOrDate}&keyword=${keyword}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          page: page + 1,
          is_last: result.last,
        };
        dispatch(GET_POST(results));
      })
      .catch((err) => console.log(err));
  };
};

// Trils 상세페이지 정보 가져오기
const getPostDetail = (postId, modal = true) => {
  return function (dispatch, getState, { history }) {
    dispatch(MODAL_STATUS(false));
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/all/posts/detail/${postId}`;
    const data = {
      method: "GET",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        const results = {
          result: result.results,
          modal: modal,
        };
        dispatch(GET_POST_DETAIL(results));
      })
      .catch((err) => console.log(err));
  };
};

// Trils 좋아요 누르기
const send_like = (postId, like) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/posts/like/${postId}`;
    const data = {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
    };
    fetch(api, data)
      .then((result) => {
        if (result.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("userInfo");
          dispatch(logOut());
          alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
          history.push("/login");
        }
        return result.json();
      })
      .then((result) => {
        if (result.ok) {
          dispatch(LIKE_OK(result.results));
        } else {
          alert(result.msg);
        }
      })
      .catch((err) => console.log(err));
  };
};

export const {
  GET_POST,
  SHIFT_POST,
  GET_POST_DETAIL,
  MODAL_STATUS,
  LIKE_OK,
  DELETE_POST,
  SEARCH_POST,
  EDIT_POST,
  SET_TRILS_MYPOST,
  MEMBER_POST,
} = trilseSlice.actions;

export const TrilsActions = {
  getPost,
  getPostDetail,
  send_like,
  searchPost,
  setPost,
  filterPost,
  getMyTrilsPost,
  getMyTrilsLikePost,
  memberpost,
  memberpostOver,
};

export default trilseSlice.reducer;
