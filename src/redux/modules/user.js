import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    password: "",
    is_login: false,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("123");
      state.email = action.payload.uid;
      console.log(action.payload);
      state.is_login = true;
    },
  },
});

// 로그인 여부 체크
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const one_user = {
      email: "",
      password: "",
    };
    dispatch(setUser(one_user));
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
      }),
    })
      .then(() => {
        console.log("회원가입 성공");
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

        return result.json();
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
              email: result.id,
              nickname: result.nickname,
            })
          );
          window.alert("로그인 성공");
          history.push("/trils");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const actionCreators = {
  loginCheckDB,
  signupDB,
  loginDB,
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export { actionCreators };
