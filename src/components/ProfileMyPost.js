import React from "react";
import styled from "styled-components";

import Dmypost from "media/svg/내가 쓴 글 D.svg";
import { BoardCard } from "components/components";
import SnsPost from "components/SnsPost";

const ProfileMyPost = () => {
  return (
    <React.Fragment>
      <ColumnWrap>
        <Wrap>
          <Icon></Icon>
          <ColumnWrap>
            <Title>내가 쓴 글</Title>
            <Div>
              <Title style={{ marginLeft: "-1.5rem" }}>Trils</Title>
              <Button>더보기</Button>
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
                width: "79rem",
                height: "3rem",
                marginLeft: "-1rem",
                marginBottom: "3rem",
                borderBottom: "3px solid #89ACFF",
              }}
            ></div>
          </ColumnWrap>
        </Wrap>

        <Wrap style={{ marginLeft: "7rem" }}>
          <ColumnWrap>
            <Div>
              <Title style={{ marginLeft: "-1.5rem" }}>Trilog</Title>
              <Button>더보기</Button>
            </Div>
            <Wrap
              style={{
                width: "78rem",
                marginBottom: "5rem",
              }}
            >
              <BoardCard margin="0 40px 0 0" />
              <BoardCard margin="0 40px 0 0" />
              <BoardCard margin="0 40px 0 0" />
              <BoardCard margin="0 40px 0 0" />
              <BoardCard margin="0 40px 0 0" />
            </Wrap>
            <div
              style={{
                width: "79rem",
                height: "3rem",
                marginLeft: "-1rem",
                borderBottom: "3px solid #89ACFF",
              }}
            ></div>
          </ColumnWrap>
        </Wrap>
      </ColumnWrap>
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

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  width: 3.5rem;
  height: 1.5rem;
  border: 1px solid #989898;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 0.2rem;
`;
