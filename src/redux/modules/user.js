import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";
import { actionCreators as profileActions } from "redux/modules/profile";
import Swal from "sweetalert2";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    nickname: null,
    is_login: false,
    is_loading: false,
    memberGrade: null,
    profileImgUrl: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.is_login = true;
      state.memberGrade = action.payload.memberGrade;
      state.profileImgUrl = action.payload.profileImgUrl;
    },
    logOut: (state, action) => {
      state.id = null;
      state.nickname = null;
      state.is_login = false;
    },
    LOADING: (state, action) => {
      state.is_loading = action.payload; // 비밀번호 찾기 로딩 중일 때
    },
  },
});
// 토큰 연장
const tokenExtension = () => {
  const access_token = localStorage.getItem("access_token");
  const accessToken = localStorage.getItem("access_token").split(" ")[1];
  const refreshToken = localStorage.getItem("refresh_token").split(" ")[1];
  const API = `${config}/auth/reissue`;
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${access_token}`,
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  })
    .then((result) => {
      // 헤더에 담긴 토큰과 만료시간 가져오기

      let access_token = result.headers.get("Access-Token");
      let refresh_token = result.headers.get("Refresh-Token");

      // 로컬에 새로 받은 토큰 저장
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("토큰재발급성공");
    })
    .catch((err) => {
      console.log(err);
    });
};
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
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          Swal.fire({
            title: data.msg,
            icon: "success",
          });
          history.push("/login");
        } else if (data.status === 400) {
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
// 로그인
const loginDB = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    let access_token_exp = null;
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
        if (result.status !== 200) {
          Swal.fire({
            title:
              "로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요.",
            icon: "warning",
          });
          return { ok: false };
        }
        //성공시 토큰, 유저 정보 저장
        let access_token = result.headers.get("Access-Token");
        let refresh_token = result.headers.get("Refresh-Token");
        let access_token_exp = result.headers.get("Access-Token-Expire-Time"); // 토큰 만료시간
        // 로컬 스토리지에 토큰 저장하기
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return result.json(); // fetch에서는 서버가 주는 json데이터를 사용하기 위해서
      })
      .then((result) => {
        if (result.ok) {
          localStorage.setItem("userInfo", JSON.stringify(result)); // JSON.stringfy 가 body에 담아오는 값
          setInterval(tokenExtension, 1740000); // 29분 후 실행
          // setInterval(tokenExtension, 5000); // 5초
          dispatch(
            setUser({
              id: result.results.id,
              nickname: result.results.nickname,
              memberGrade: result.results.memberGrade,
              profileImgUrl: result.results.profileImgUrl,
            })
          );
          dispatch(
            profileActions.GET_PROFILE({
              user_img: result.results.profileImgUrl,
              memberGrade: result.results.memberGrade,
              nickname: result.results.nickname,
            })
          );
          Swal.fire({
            title: "로그인 되었습니다.",
            icon: "success",
          });
          history.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 소셜 로그인 (카카오) 인가코드 넘기기
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/auth/kakao/callback?code=${code}`;
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          Swal.fire({
            title:
              "로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해주세요.",
            icon: "warning",
          });
          history.replace("/");
          return { ok: false };
        }

        let access_token = result.headers.get("Access-Token");
        let refresh_token = result.headers.get("Refresh-Token");

        // 로컬 스토리지에 토큰 저장하기
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return result.json(); // fetch에서는 서버가 주는 json데이터를 사용하기 위해서
      })
      .then((result) => {
        if (result.ok) {
          localStorage.setItem("userInfo", JSON.stringify(result)); // JSON.stringfy 가 body에 담아오는 값
          setInterval(tokenExtension, 1740000); // 29분 후 실행
          // setInterval(tokenExtension, 5000); // 5초

          dispatch(
            setUser({
              id: result.results.id,
              nickname: result.results.nickname,
              memberGrade: result.results.memberGrade,
              profileImgUrl: result.results.profileImgUrl,
            })
          );
          Swal.fire({
            title: "로그인 되었습니다.",
            icon: "success",
          });
          history.replace("/");
          dispatch(profileActions.getProfile());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 소셜 로그아웃
const kakaoLogout = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/auth/logout`;
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        // console.log("카카오 로그아웃 성공!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
// 로그인 여부 체크
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("access_token");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!access_token || !userInfo) {
      // 로컬스토리지에 토큰 또는 유저정보가 없으면
      return;
    }
    dispatch(
      setUser({
        id: userInfo.results.id,
        nickname: userInfo.results.nickname,
        memberGrade: userInfo.results.memberGrade,
        profileImgUrl: userInfo.results.profileImgUrl,
      })
    );

    tokenExtension();
    setInterval(tokenExtension, 1740000);
    // setInterval(tokenExtension, 5000); // 5초
    dispatch(profileActions.getProfile()); // 프로필 조회
  };
};
// 로그아웃
const logout = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userInfo");
    dispatch(logOut());
    Swal.fire({
      title: "로그아웃 되었습니다.",
      icon: "success",
    });
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
        Swal.fire({
          title: data.msg,
          icon: "success",
        });
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
  kakaoLogin,
  kakaoLogout,
};
export const { setUser, logOut, LOADING } = userSlice.actions;
export default userSlice.reducer;
