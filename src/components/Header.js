import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

import logo from "media/svg/triport_logo.svg";

const Header = (props) => {
  if (props.ok === true) {
    return (
      <React.Fragment>
        <div style={{ position: "sticky", top: "0", zIndex: "99" }}>
          <Wrap>
            <Logo
              onClick={() => {
                history.push("/");
              }}
            />
            <LeftWrap>
              <Sns
                onClick={() => {
                  history.push("/post");
                }}
              >
                SNS
              </Sns>
              <Board>게시판</Board>
            </LeftWrap>
            <div style={{ width: "30rem" }}></div>
            <RightWrap>
              <Nickname>{props.nickname}</Nickname>
              <MyOrLogin>마이페이지</MyOrLogin>
              <LogoutOrSignUp>로그아웃</LogoutOrSignUp>
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
          <Logo
            onClick={() => {
              history.push("/");
            }}
          />
          <LeftWrap>
            <Sns
              onClick={() => {
                history.push("/post");
              }}
            >
              SNS
            </Sns>
            <Board>게시판</Board>
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
  click: true,
};

export default Header;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 5rem;
  background-color: #ffffff;
  background-size: cover;
  align-items: center;
`;

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "TTTogether";
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #2b61e1 0% 0% no-repeat padding-box;
  opacity: 0.1;
  margin-bottom: 5rem;
`;

const Logo = styled.div`
  cursor: pointer;
  width: 15rem;
  height: 2.5rem;
  background-image: url("${logo}");
  background-size: 15rem 2.5rem;
`;

const Sns = styled.a`
  cursor: pointer;
  color: #2b61e1;
  margin-right: 4rem;
  opacity: 0.7;
`;

const Board = styled.a`
  cursor: pointer;

  color: #2b61e1;
  opacity: 0.7;
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
  margin-right: 2rem;
  margin-top: 0.15rem;
`;
