import React, { useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

import { Logo } from "media/svg/Svg";

import Category from "components/Category";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  const is_logout = () => {
    dispatch(userActions.logout());
    window.alert("로그아웃 되었습니다!");
    history.replace("/");
  };

  if (user.is_login === true) {
    return (
      <React.Fragment>
        <div style={{ position: "sticky", top: "0", zIndex: "99" }}>
          <Wrap>
            <LogoWrapper
              onClick={() => {
                history.push("/");
              }}
            >
              <Logo />
            </LogoWrapper>
            <LeftWrap>
              <Category />
            </LeftWrap>
            <div style={{ width: "30rem" }}></div>
            <RightWrap>
              <Nickname>{user.nickname}</Nickname>
              <MyOrLogin
                onClick={() => {
                  history.push("/profile");
                }}
              >
                마이페이지
              </MyOrLogin>
              <LogoutOrSignUp onClick={is_logout}>로그아웃</LogoutOrSignUp>
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
              history.push("/");
            }}
          >
            <Logo />
          </LogoWrapper>
          <LeftWrap>
            <Category />
          </LeftWrap>
          <div style={{ width: "30rem" }}></div>
          <RightWrap>
            <MyOrLogin
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </MyOrLogin>
            <LogoutOrSignUp
              onClick={() => {
                history.push("/signup");
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
  font-family: "TTTogether";
  margin: 0px auto;
  margin-left: 5rem;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
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

const LogoutOrSignUp = styled.button`
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  padding: 0.3rem;
  width: 5rem;
  height: 1.7rem;
`;

const Nickname = styled.div`
  width: 5rem;
  margin-right: 2rem;
  margin-top: 0.15rem;
`;
