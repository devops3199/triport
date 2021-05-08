import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

// http://13.209.8.146

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    ok: true,
  },
  reducers: {
    SET_USER: (state, action) =>
      produce(state, (draft) => {
        state.user = action.payload;
      }),
  },
});

// 로그인 여부 체크
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const one_user = {
      email: "",
      password: "",
    };
    dispatch(SET_USER(one_user));
  };
};

// 회원가입
const signupDB = (email, pwd, pwdcheck, nickname) => {
  return function (dispatch, getState, { history }) {
    const API = "http://13.209.8.146/auth/signup";
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
        passwordCheck: pwdcheck,
        nickname: nickname,
        memberGrade: "TRAVELER",
      }),
    })
      .then(() => {
        console.log("회원가입 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const actionCreators = {
  loginCheckDB,
  signupDB,
};

export const { SET_USER } = userSlice.actions;
export default userSlice.reducer;

export { actionCreators };
