import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";

const profileimgSlice = createSlice({
  name: "profile",
  initialState: {
    user_img: "",
    memberGrade: null,
    nickname: null,
    mypost_trils_data: [],
    mypost_trilog_data: [],
    like_trils_data: [],
    like_trilog_data: [],
  },
  reducers: {
    SET_PREVIEW: (state, action) => {
      state.user_img = action.payload;
    },
    GET_PROFILE: (state, action) => {
      state.user_img = action.payload.user_img;
      state.memberGrade = action.payload.memberGrade;
      state.nickname = action.payload.nickname;
    },
    UPDATE_PROFILE: (state, action) => {
      state.uploading = action.payload;
    },
    POST_TRILS_LOAD: (state, action) => {
      state.mypost_trils_data = action.payload;
    },
    POST_TRILOG_LOAD: (state, action) => {
      state.mypost_trilog_data = action.payload;
    },
    LIKE_TRILS_LOAD: (state, action) => {
      state.like_trils_data = action.payload;
    },
    LIKE_TRILOG_LOAD: (state, action) => {
      state.like_trilog_data = action.payload;
    },
  },
});

// 프로필 조회
const getProfile = () => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/member/profile`;
    let access_token = localStorage.getItem("access_token");

    // if (!access_token) {
    //   console.log("토큰 없음");
    //   return;
    // }

    fetch(API, {
      method: "GET",

      // 헤더에 토큰 담아 보내기
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          GET_PROFILE({
            user_img: data.results.profileImgUrl,
            memberGrade: data.results.memberGrade,
            nickname: data.results.nickname,
          })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};

// 프로필 수정
const updateProfile = (nickname, newpwd, newpwdcheck, img) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");

    // if (!access_token) {
    //   console.log("토큰 없음");
    //   return;
    // }

    // formdata에 담기
    let formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("newPassword", newpwd);
    formData.append("newPasswordCheck", newpwdcheck);
    formData.append("profileImgFile", img);
    console.log(formData);

    const API = `${config}/member/profile`;

    fetch(API, {
      method: "POST",
      // 헤더에 토큰 담아 보내기
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("수정되었습니다!");
        history.replace("/");
        history.go(0); // 메인 페이지로 돌아간 후 새로고침
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 내가 쓴 Trils 조회
const myTrilsLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/posts/member`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(POST_TRILS_LOAD(results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 내가 쓴 Trilog 조회
const myTrilogLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/boards/member`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(POST_TRILOG_LOAD(results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 좋아요 Trils 조회

const likeTrilsLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/posts/member/like`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(LIKE_TRILS_LOAD(results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 좋아요 Trilog 조회
const likeTrilogLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/boards/member/like`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(LIKE_TRILOG_LOAD(results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const {
  SET_PREVIEW,
  GET_PROFILE,
  UPDATE_PROFILE,
  POST_TRILS_LOAD,
  POST_TRILOG_LOAD,
  LIKE_TRILS_LOAD,
  LIKE_TRILOG_LOAD,
} = profileimgSlice.actions;

export const actionCreators = {
  getProfile,
  updateProfile,
  myTrilsLoad,
  myTrilogLoad,
  likeTrilsLoad,
  likeTrilogLoad,
};

export default profileimgSlice.reducer;
