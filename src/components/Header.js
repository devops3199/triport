import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Logo } from "media/svg/Svg";

import grade1 from "media/svg/등급1.svg";
import grade2 from "media/svg/등급2.svg";
import grade3 from "media/svg/등급3.svg";

import Category from "components/Category";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userAcitons } from "redux/modules/user";
import { actionCreators as profileActions } from "redux/modules/profile";

const Header = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const userprofile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  const gradeImg = () => {
    if (user.memberGrade === "TRAVELER") {
      return grade1;
    }
    if (user.memberGrade === "TRAVEL_EDITOR") {
      return grade2;
    }
    if (user.memberGrade === "TRAVEL_MASTER") {
      return grade3;
    }
  };

  // 카카오 로그아웃
  const KAKAO_LOGOUT_URL =
    "https://kauth.kakao.com/oauth/logout?client_id=b30e166ade03d146889e1b012679fcf6&logout_redirect_uri=https://triport.kr/auth/logout";
  // "https://kauth.kakao.com/oauth/logout?client_id=b30e166ade03d146889e1b012679fcf6&logout_redirect_uri=http://localhost:3000/auth/logout";

  if (user.is_login === true) {
    return (
      <React.Fragment>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: "50",
            backgroundColor: "#fff",
          }}
        >
          <Wrap>
            <LogoWrapper
              onClick={() => {
                const pathname = history.location.pathname;
                if (pathname === "/") {
                  window.location.reload();
                } else {
                  history.push("/");
                }
              }}
            >
              <Logo />
            </LogoWrapper>
            <LeftWrap>
              <Category history={history} />
            </LeftWrap>
            <div style={{ width: "30rem" }}></div>
            <RightWrap>
              <Image url={user.profileImgUrl} />
              <Grade url={gradeImg} />
              <Nickname>{user.nickname}</Nickname>
              <MyOrLogin
                onClick={() => {
                  const pathname = history.location.pathname;

                  if (pathname === "/profile") {
                    window.location.reload();
                  } else {
                    history.push("/profile");
                  }
                }}
              >
                마이페이지
              </MyOrLogin>

              {/* 카카오 로그아웃 URL로 이동 -> OAuth2LogoutHandler(카카오 로그아웃, 일반 로그아웃 둘 다 적용) 컴포넌트 로드 */}
              <LogoutOrSignUp href={KAKAO_LOGOUT_URL}>로그아웃</LogoutOrSignUp>
            </RightWrap>
          </Wrap>
          <Line />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Wrap>
          <LogoWrapper
            onClick={() => {
              const pathname = history.location.pathname;
              if (pathname === "/") {
                window.location.reload();
              } else {
                history.push("/");
              }
            }}
          >
            <Logo />
          </LogoWrapper>
          <LeftWrap>
            <Category history={history} />
          </LeftWrap>
          <div style={{ width: "30rem" }}></div>
          <RightWrap>
            <MyOrLogin
              onClick={() => {
                const pathname = history.location.pathname;
                if (pathname === "/login") {
                  window.location.reload();
                } else {
                  history.push("/login");
                }
              }}
            >
              로그인
            </MyOrLogin>
            <LogoutOrSignUp
              onClick={() => {
                const pathname = history.location.pathname;
                if (pathname === "/signup") {
                  window.location.reload();
                } else {
                  history.push("/signup");
                }
              }}
            >
              회원가입
            </LogoutOrSignUp>
          </RightWrap>
        </Wrap>
        <Line />
      </React.Fragment>
    );
  }
};

Header.defaultProps = {
  ok: false,
  nickname: "닉네임예시",
};

export default Header;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 1280px;
  margin: 0px auto;
  height: 5rem;
  background-color: #ffffff;
  background-size: cover;
  align-items: center;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "paybooc-Bold";
  margin: 0px auto;
  margin-left: 5rem;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #89acff;
  opacity: 1;
  margin-bottom: 5rem;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  & svg {
    width: 12rem;
  }
`;

const MyOrLogin = styled.button`
  cursor: pointer;
  background-color: #2b61e1;
  color: #ffffff;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 0.3rem;
  margin-right: 1.5rem;
  width: 5rem;
  height: 1.7rem;
`;

const LogoutOrSignUp = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  padding: 0.3rem;
  width: 4.5rem;
  height: 1rem;
  font-size: 0.9rem;
  text-decoration: none;
  &:visited {
    color: #5a5a5a;
  }
`;

const Nickname = styled.div`
  width: 5rem;
  margin-right: 2rem;
  margin-top: -0.3rem;
  font-size: 1rem;
  font-weight: 800;
`;

const Image = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 1px solid #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  background-position: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin-right: 1rem;
`;

const Grade = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-position: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.3rem;
  margin-right: 0.2rem;
`;
