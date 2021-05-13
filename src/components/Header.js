import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

import { Logo } from "media/svg/Svg";
import grade1 from "media/svg/등급1.svg";

import Category from "components/Category";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const preview = useSelector((state) => state.profileimg.user_img);

  const pathname = history.location.pathname;

  const is_logout = () => {
    dispatch(userActions.logout());
    window.alert("로그아웃 되었습니다!");
    history.replace("/");
  };

  if (user.is_login === true) {
    return (
      <React.Fragment>
        <div style={{ position: "sticky", top: "0", zIndex: "50" }}>
          <Wrap>
            <LogoWrapper
              onClick={() => {
                if (pathname === "/") {
                  history.replace("/");
                } else {
                  history.push("/");
                }
              }}
            >
              <Logo />
            </LogoWrapper>
            <LeftWrap>
              <Category />
            </LeftWrap>
            <div style={{ width: "30rem" }}></div>
            <RightWrap>
              <Image src={preview} />
              <Grade />
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
              if (pathname === "/") {
                history.replace("/");
              } else {
                history.push("/");
              }
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
  margin-top: -0.3rem;
  font-size: 1.2rem;
  font-weight: 800;
`;

const Image = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border: 1px solid #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  background-position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin-right: 1rem;
`;

const Grade = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-position: center;
  background-image: url("${grade1}");
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.3rem;
  margin-right: 0.2rem;
`;
