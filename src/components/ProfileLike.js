import React, { useState } from "react";
import styled from "styled-components";

import DmyLike from "media/svg/좋아요D.svg";

import Video from "components/trils/Video";
import { BoardCard } from "components/components";
import TrilsDetail from "../components/trils/TrilsDetail";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { TrilsActions } from "redux/modules/trils";
import { actionCreators as profileActions } from "redux/modules/profile";
import { actionCreators as TrilogActions } from "redux/modules/trilog";

import { Fragment } from "react";

const ProfileLike = () => {
  const dispatch = useDispatch();
  const liketrils_post = useSelector((state) => state.trils.data);
  const liketrilog_post = useSelector((state) => state.trilog.main.list);
  const [trilsindex, setTrilsIndex] = useState(4);
  const [trilogindex, setTrilogIndex] = useState(5);

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(TrilsActions.getMyTrilsLikePost());
    dispatch(TrilogActions.getTrilogMainMyPageLike());
  }, []);

  return (
    <React.Fragment>
      {modal ? <TrilsDetail history={history} /> : null}
      <ColumnWrap>
        <Wrap>
          <ColumnWrap>
            <Div>
              <Title>Trils</Title>
              <Button
                onClick={(e) => {
                  e.target.style.display = "none";
                  setTrilsIndex(liketrils_post.length);
                }}
              >
                더보기
              </Button>
            </Div>
            <Postlist>
              {!liketrils_post || liketrils_post.length === 0 ? (
                <Text>내가 좋아하는 Trils가 없습니다.</Text>
              ) : (
                <>
                  {liketrils_post.map((p, idx) => {
                    if (idx <= trilsindex) {
                      if ((idx + 1) % 4 !== 0) {
                        return (
                          <Fragment key={idx}>
                            <Video {...p} history={history} />
                          </Fragment>
                        );
                      }
                    }
                  })}
                </>
              )}
            </Postlist>
            <Br />
          </ColumnWrap>
        </Wrap>

        <ColumnWrap>
          <Wrap style={{ marginBottom: "5rem" }}>
            <ColumnWrap>
              <Div>
                <Title>Trilog</Title>
                <Button
                  onClick={(e) => {
                    e.target.style.display = "none";
                    setTrilogIndex(liketrilog_post.length);
                  }}
                >
                  더보기
                </Button>
              </Div>
              <Postlist>
                {!liketrilog_post || liketrilog_post.length === 0 ? (
                  <Text>내가 좋아하는 Trilog가 없습니다.</Text>
                ) : (
                  <>
                    {liketrilog_post.map((val, idx) => {
                      const index = idx + 1;
                      if (idx <= trilogindex) {
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

export default ProfileLike;

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
  display: grid;
  column-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: 5rem;

  @media (max-width: 540px) {
    width: 95%;
    margin-left: 2rem;
    justify-content: center;
  }
  @media (max-width: 375px) {
    margin-left: 1rem;
    width: 90%;
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
