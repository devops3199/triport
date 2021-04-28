import React from "react";
import styled from "styled-components";

import logo from "../shared/triportlogo.png";
import "./Header.css";

const Header = () => {
  return (
    <React.Fragment>
      <div className="Category">
        <Wrap>
          <Logo />
          <LeftWrap>
            <Sns>SNS</Sns>
            <Board>게시판</Board>
          </LeftWrap>
          <div style={{ width: "1%" }}></div>
          <RightWrap>
            <Nickname>닉네임</Nickname>
            <My>마이페이지</My>
            <Logout>로그아웃</Logout>
          </RightWrap>
        </Wrap>
      </div>
      <Line />
    </React.Fragment>
  );
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
  margin-left: -10rem;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background: #2b61e1 0% 0% no-repeat padding-box;
  opacity: 0.1;
`;

const Logo = styled.div`
  width: 15rem;
  height: 2.5rem;
  background-image: url("${logo}");
  background-size: 15rem 2.5rem;
`;

const Sns = styled.div`
  color: #2b61e1;
  margin-right: 4rem;

  :active {
    font-weight: 800;
  }
`;

const Board = styled.div`
  color: #2b61e1;
`;

const My = styled.button`
  background-color: #2b61e1;
  color: #ffffff;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 0.3rem;
  margin-right: 1.5rem;
`;

const Logout = styled.button`
  background-color: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  padding: 0.3rem;
`;

const Nickname = styled.div`
  margin-right: 2rem;
`;
