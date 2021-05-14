import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";

const profileimgSlice = createSlice({
  name: "profile",
  initialState: {
    user_img: "",
    memberGrade: null,
    nickname: null,
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
  },
});

// 프로필 조회
const getProfile = () => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/member/profile`;
    let access_token = localStorage.getItem("access_token");
    console.log(access_token);

    if (!access_token) {
      console.log("토큰 없음");
      return;
    }

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
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 프로필 수정
const updateProfile = (nickname, newpwd, newpwdcheck, img) => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/member/profile`;
    let access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.log("토큰 없음");
      return;
    }

    fetch(API, {
      method: "POST",

      // 헤더에 토큰 담아 보내기
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        nickname: nickname,
        newPassword: newpwd,
        newPasswordCheck: newpwdcheck,
        profileImgUrl: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("수정되었습니다!");
        history.replace("/");
        history.go(0); // 메인 페이지로 돌아간 후 새로고침
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const { SET_PREVIEW, GET_PROFILE, UPDATE_PROFILE } =
  profileimgSlice.actions;

export const actionCreators = {
  getProfile,
  updateProfile,
};

export default profileimgSlice.reducer;
