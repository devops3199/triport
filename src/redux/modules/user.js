import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

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

const loginCheckDB = () => {
  // 로그인 여부 체크
  return function (dispatch, getState, { history }) {
    const one_user = {
      email: "",
      password: "",
    };
    dispatch(SET_USER(one_user));
  };
};

const signupDB = (email, pw, pwCheck, nickName, role) => {
  return function (dispatch, getState, { history }) {
    const API = "";
    fetch(API, {
      method: "POST",
      headers: {
        // ?
      },
      body: JSON.stringify({
        email: email,
        password: pw,
        passwordCheck: pwCheck,
        nickname: nickName,
        role: role,
      }),
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
