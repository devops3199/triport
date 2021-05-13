import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";

import moment from "moment";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    nickname: null,
    is_login: false,
    is_loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.is_login = true;
    },
    logOut: (state, action) => {
      state.id = null;
      state.nickname = null;
      state.is_login = false;
    },
    LOADING: (state, action) => {
      state.is_loading = action.payload;
    },
  },
});

// 회원가입
const signupDB = (email, pwd, pwdcheck, nickname) => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/auth/signup`;
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
      }),
    })
      .then(() => {
        console.log("회원가입 성공");
        window.alert("회원가입에 성공하였습니다!");
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        window.alert(
          "회원가입에 실패하셨습니다. 이미 가입된 이메일인지 확인해주세요."
        );
      });
  };
};

// 로그인
const loginDB = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/auth/login`;
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((result) => {
        //성공시 토큰, 유저 정보 저장
        console.log(result);
        let access_token = result.headers.get("Access-Token");
        let refresh_token = result.headers.get("Refresh-Token");
        let access_token_exp = result.headers.get("Access-Token-Expire-Time"); // 토큰 만료시간

        const Current_time = new Date().getTime();

        setTimeout(tokenExtension(), access_token_exp - Current_time - 60000);

        // 로컬 스토리지에 토큰 저장하기
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        return result.json(); // fetch에서는 서버가 주는 json데이터를 사용하기 위해서
      })
      .then((result) => {
        console.log(result);

        //성공시 state.user 저장
        if (result.status === 401) {
          window.alert(
            "로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요."
          );
        } else {
          localStorage.setItem("userInfo", JSON.stringify(result)); // JSON.stringfy 가 body에 담아오는 값
          dispatch(
            setUser({
              id: result.id,
              nickname: result.nickname,
            })
          );
          window.alert("로그인 성공");
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 토큰 연장
const tokenExtension = () => {
  return function (dispatch, getState) {
    const accessToken = localStorage.getItem("access_token").split(" ")[1];
    const refreshToken = localStorage.getItem("refresh_token").split(" ")[1];
    console.log(accessToken, refreshToken);

    const API = `${config}/auth/reissue`;
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
    })
      .then((result) => {
        console.log(result);
        // 헤더에 담긴 토큰 가져오기
        let access_token = result.headers.get("Access-Token");
        let refresh_token = result.headers.get("Refresh-Token");
        let access_token_exp = result.headers.get("Access-Token-Expire-Time"); // 토큰 만료시간

        // 현재 시간
        let Current_time = new Date().getTime();

        // 기존 토큰 지우고,
        localStorage.clear();

        // 로컬에 새로 받은 토큰 저장
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // 만료되기 1분 전에 재발급하기
        setTimeout(tokenExtension(), access_token_exp - Current_time - 60000);
        console.log(moment(Current_time).format("hh:mm:ss"));
        console.log("토큰 재생성 성공");

        return;
      })
      .catch((err) => {
        console.log(err);
        console.log("토큰 재생성 실패");
      });
  };
};

// 로그인 여부 체크
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (!access_token || !userInfo) {
      // 로컬스토리지에 토큰 또는 유저정보가 없으면
      return false;
    }
    dispatch(
      setUser({
        id: userInfo.id,
        nickname: userInfo.nickname,
      })
    );
  };
};

// 로그아웃
const logout = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userInfo");
    dispatch(logOut());
    history.replace("/");
  };
};

// 비밀번호 찾기
const FindPwdDB = (email) => {
  return function (dispatch, getState, { history }) {
    dispatch(LOADING(true)); // 로딩중
    const API = `${config}/mail/reset/password`;
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json()) // json 형태로 변환해주고,
      .then((data) => {
        dispatch(LOADING(false)); // 로딩 끝남
        alert(data.message);
        history.push("/login");
      })
      .catch((err) => {
        dispatch(LOADING(false));

        console.log(err);
      });
  };
};

export const actionCreators = {
  loginCheckDB,
  signupDB,
  loginDB,
  logout,
  FindPwdDB,
  tokenExtension,
};

export const { setUser, logOut, LOADING } = userSlice.actions;
export default userSlice.reducer;
