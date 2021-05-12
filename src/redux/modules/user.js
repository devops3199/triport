import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    nickname: null,
    is_login: false,
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
  },
});

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
    const API = "http://13.209.8.146/auth/login";
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
        let access_token = result.headers.get("Access-Token");
        let refresh_token = result.headers.get("Refresh-Token");

        console.log(access_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        return result.json(); // fetch에서는 서버가 주는 json데이터를 사용하기 위해서
      })
      .then((result) => {
        console.log(result);

        //성공시 state.user 저장
        if (result.status === 401) {
          window.alert("로그인에 실패했습니다.");
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
    const API = "http://13.209.8.146/mail/reset/password";
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
        alert(data.message);
      })
      .catch((err) => {
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
};

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
