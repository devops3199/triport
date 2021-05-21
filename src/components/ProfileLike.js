import React from "react";
import styled from "styled-components";

import DmyLike from "media/svg/좋아요D.svg";

import Video from "components/trils/Video";
import { BoardCard } from "components/components";
import TrilsDetail from "../components/trils/TrilsDetail";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "redux/modules/profile";
import { actionCreators as TrilogActions } from "redux/modules/trilog";

const ProfileLike = () => {
  const dispatch = useDispatch();
  const liketrils_post = useSelector((state) => state.profile.like_trils_data);
  const liketrilog_post = useSelector((state) => state.trilog.main.list);

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(profileActions.likeTrilsLoad());
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
              <Button>더보기</Button>
            </Div>
            <Postlist>
              {!liketrils_post || liketrils_post.length === 0 ? (
                <div>내가 좋아하는 Trils가 없습니다.</div>
              ) : (
                <>
                  {liketrils_post.map((p, idx) => {
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
                {!liketrilog_post || liketrilog_post.length === 0 ? (
                  <div>내가 좋아하는 Trilog가 없습니다.</div>
                ) : (
                  <>
                    {" "}
                    {liketrilog_post.map((val, idx) => {
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
