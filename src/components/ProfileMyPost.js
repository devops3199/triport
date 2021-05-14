import React, { useState } from "react";
import styled from "styled-components";

import Dmypost from "media/svg/내가 쓴 글 D.svg";

import { BoardCard } from "components/components";
import MyPostDetail from "./MyPostDetail";
import TrilsDetail from "../components/trils/TrilsDetail";

import Video from "components/trils/Video";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "redux/modules/profile";
import { TrilsActions } from "redux/modules/trils";

const ProfileMyPost = (props) => {
  const dispatch = useDispatch();
  const mypost_list = useSelector((state) => state.profile.trils_data);
  console.log(mypost_list);

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(profileActions.myPostLoad());
  }, []);

  return (
    <React.Fragment>
      {modal ? <TrilsDetail history={history} /> : null}
      <ColumnWrap>
        <Wrap>
          <Icon></Icon>
          <ColumnWrap>
            <Title>내가 쓴 글</Title>
            <Div>
              <Title style={{ marginLeft: "-1.5rem" }}>Trils</Title>
              <Button>더보기</Button>
            </Div>
            <Postlist>
              {!mypost_list || mypost_list.length === 0 ? (
                <div>내 Trils가 없습니다.</div>
              ) : (
                <>
                  {mypost_list.map((p, idx) => {
                    if ((idx + 1) % 3 !== 0) {
                      return <Video {...p} history={history} mr />;
                    } else {
                      return <Video {...p} history={history} />;
                    }
                  })}
                </>
              )}
            </Postlist>
            <Br
              style={{
                width: "79rem",
                height: "3rem",
                marginLeft: "-1rem",
                marginBottom: "3rem",
                borderBottom: "3px solid #89ACFF",
              }}
            ></Br>
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
              트릴로그들
            </Wrap>
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
  font-family: "paybooc-Bold";
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

const Br = styled.div`
  width: 79rem;
  height: 3rem;
  margin-left: -1rem;
  margin-bottom: 3rem;
  border-bottom: 3px solid #89acff;
`;

const Postlist = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 1280px;
`;
