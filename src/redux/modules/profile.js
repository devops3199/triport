import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";
import { actionCreators as userActions } from "redux/modules/user";
import Swal from "sweetalert2";

const profileimgSlice = createSlice({
  name: "profile",
  initialState: {
    user_img: "",
    memberGrade: null,
    nickname: null,
    kakaoId: null,
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
      state.kakaoId = action.payload.kakaoId;
    },
    EDIT_PROFILE: (state, action) => {
      state.nickname = action.payload.nickname;
      state.user_img = action.payload.img;
      state.memberGrade = state.memberGrade;
      state.newpwd = action.payload.newpwd;
      state.newpwdcheck = action.payload.newpwdcheck;
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
        console.log(data);
        dispatch(
          GET_PROFILE({
            user_img: data.results.profileImgUrl,
            memberGrade: data.results.memberGrade,
            nickname: data.results.nickname,
            kakaoId: data.results.kakaoId,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// 프로필 수정 - 이미지 수정
const updateProfileImage = (img) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");

    // formdata에 담기
    const formData = new FormData();
    formData.append("profileImgFile", img);

    const api = `${config}/member/profile/img`;

    fetch(api, {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const obj = {
            img: img,
          };
          dispatch(EDIT_PROFILE(obj));
          Swal.fire({
            title: data.msg,
            icon: "success",
          });
          dispatch(getProfile());
        } else if (data.status === 400) {
          Swal.fire({
            title: "이미지를 선택해주세요.",
            icon: "warning",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 프로필 수정 - 닉네임
const nameUpdateProfile = (nickname) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");

    const api = `${config}/member/profile/nickname`;

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          const obj = {
            nickname: nickname,
          };
          dispatch(EDIT_PROFILE(obj));
          Swal.fire({
            title: data.msg,
            icon: "success",
          });
          dispatch(getProfile());
        } else {
          Swal.fire({
            title: data.msg,
            icon: "warning",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 프로필 수정 - 비밀번호
const pwdUpdateProfile = (newpwd, newpwdcheck) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");

    const api = `${config}/member/profile/pwd`;

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        newPassword: newpwd,
        newPasswordCheck: newpwdcheck,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          const obj = {
            newpwd: newpwd,
            newpwdcheck: newpwdcheck,
          };
          dispatch(EDIT_PROFILE(obj));
          Swal.fire({
            title: data.msg,
            icon: "success",
          });
          dispatch(getProfile());
        } else {
          Swal.fire({
            title: data.msg,
            icon: "warning",
          });
        }
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

// 회원탈퇴
const deleteAccountAPI = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/member/profile`;

    fetch(API, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          dispatch(userActions.logout());
          history.replace("/");
          Swal.fire({
            title: data.msg,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: data.msg,
            icon: "warning",
          });
        }
      });
  };
};

export const {
  SET_PREVIEW,
  GET_PROFILE,
  EDIT_PROFILE,
  UPDATE_PROFILE,
  POST_TRILS_LOAD,
  POST_TRILOG_LOAD,
  LIKE_TRILS_LOAD,
  LIKE_TRILOG_LOAD,
} = profileimgSlice.actions;

export const actionCreators = {
  getProfile,
  myTrilsLoad,
  myTrilogLoad,
  likeTrilsLoad,
  likeTrilogLoad,
  updateProfileImage,
  nameUpdateProfile,
  pwdUpdateProfile,
  deleteAccountAPI,
  GET_PROFILE,
};

export default profileimgSlice.reducer;
