import React, { useState } from "react";
import styled from "styled-components";

import Dmypost from "media/svg/내가 쓴 글 D.svg";

import Video from "components/trils/Video";
import TrilsDetail from "../components/trils/TrilsDetail";
import { BoardCard } from "components/components";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "redux/modules/profile";
import { actionCreators as TrilogActions } from "redux/modules/trilog";

const ProfileMyPost = () => {
  const dispatch = useDispatch();
  const mytrils_post = useSelector((state) => state.profile.mypost_trils_data);
  const mytrilog_post = useSelector((state) => state.trilog.main.list);

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(profileActions.myTrilsLoad());
    dispatch(TrilogActions.getTrilogMainMyPage());
  }, []);

  return (
    <React.Fragment>
      {modal ? <TrilsDetail history={history} /> : null}
      <ColumnWrap>
        <Wrap>
          <ColumnWrap>
            <Div>
              <Title>Trils</Title>
              <Button>더보기</Button>
            </Div>
            <Postlist>
              {!mytrils_post || mytrils_post.length === 0 ? (
                <Text>내 Trils가 없습니다.</Text>
              ) : (
                <>
                  {mytrils_post.map((p, idx) => {
                    if ((idx + 1) % 3 !== 0) {
                      return <Video {...p} history={history} mr />;
                    } else {
                      return <Video {...p} history={history} />;
                    }
                  })}
                </>
              )}
            </Postlist>
            <Br />
          </ColumnWrap>
        </Wrap>

        <ColumnWrap>
          <Wrap>
            <ColumnWrap>
              <Div>
                <Title>Trilog</Title>
                <Button>더보기</Button>
              </Div>
              <Postlist>
                {!mytrilog_post || mytrilog_post.length === 0 ? (
                  <Text>내 Trilog가 없습니다.</Text>
                ) : (
                  <>
                    {" "}
                    {mytrilog_post.map((val, idx) => {
                      const index = idx + 1;

                      if (index % 5 === 0) {
                        return (
                          <BoardCardDiv>
                            <BoardCard
                              data={val}
                              key={index}
                              margin="50px 20px 0 0"
                            />
                          </BoardCardDiv>
                        );
                      } else {
                        return (
                          <BoardCardDiv>
                            <BoardCard
                              data={val}
                              key={index}
                              margin="50px 20px 0 0"
                            />
                          </BoardCardDiv>
                        );
                      }
                    })}
                  </>
                )}
              </Postlist>
            </ColumnWrap>
          </Wrap>
        </ColumnWrap>
      </ColumnWrap>
    </React.Fragment>
  );
};

export default ProfileMyPost;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "paybooc-Bold";
  width: 100vw;
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-left: 5rem;
  @media (max-width: 540px) {
    margin-left: 1rem;
  }
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

  @media (max-width: 1270px) {
    font-size: 1rem;
    width: 6rem;
  }
`;

const Button = styled.button`
  width: 3.5rem;
  height: 1.5rem;
  border: 1px solid #989898;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 0.2rem;
  margin-right: 5rem;
  @media (max-width: 540px) {
    margin-right: 2rem;
  }
`;

const Br = styled.div`
  width: 90%;
  height: 3rem;
  margin-bottom: 3rem;
  border-bottom: 3px solid #89acff;
  margin-left: 5rem;
  @media (max-width: 540px) {
    margin-left: 2rem;
    width: 85%;
  }
`;

const Postlist = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: 5rem;

  @media (max-width: 1270px) {
    justify-content: center;
  }
  @media (max-width: 540px) {
    width: 95%;
    margin-left: 2rem;
    justify-content: center;
  }
  @media (max-width: 375px) {
    justify-content: center;
  }
`;

const Text = styled.div`
  margin-left: 6rem;
`;

const BoardCardDiv = styled.div`
  @media (max-width: 540px) {
    transform: scale(0.7);
  }
  @media (max-width: 375px) {
    transform: scale(1);
  }
`;

const VideoDiv = styled.div`
  @media (max-width: 540px) {
    height: 540px;
  }
  @media (max-width: 375px) {
    transform: scale(1);
  }
`;
