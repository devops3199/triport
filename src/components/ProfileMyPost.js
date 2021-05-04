import React from "react";
import styled from "styled-components";

import Dmypost from "media/svg/내가 쓴 글 D.svg";
import BoardCard from "components/components";
import SnsPost from "components/SnsPost";

const ProfileMyPost = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Icon></Icon>
        <SmallWrap>
          <Title>내가 쓴 글</Title>
          <Div>
            <Title style={{ marginLeft: "-1.5rem" }}>Trils</Title>
            <div>더보기</div>
          </Div>
          <Wrap
            style={{
              width: "78rem",
              marginLeft: "-4rem",
            }}
          >
            <SnsPost />
            <SnsPost />
            <SnsPost />
          </Wrap>
          <div
            style={{
              width: "79.5rem",
              height: "3rem",
              marginLeft: "-1rem",
              borderBottom: "3px solid #89ACFF",
            }}
          ></div>
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

export default ProfileMyPost;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "TTTogether";
  width: auto;
`;

const SmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 22rem;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 78rem;
`;

const Icon = styled.div`
  width: 2rem;
  height: 1.3rem;
  background-image: url("${Dmypost}");
  background-size: 2rem 1.3rem;
  margin-left: 5rem;
`;

const Title = styled.div`
  width: 8rem;
  color: #2b61e1;
  margin-left: 1rem;
  margin-bottom: 3rem;
  font-size: 1.2rem;
`;
