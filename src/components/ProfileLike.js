import React from "react";
import styled from "styled-components";

import DmyLike from "media/svg/좋아요D.svg";

import Video from "components/trils/Video";
import { BoardCard } from "components/components";
import TrilsDetail from "../components/trils/TrilsDetail";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "redux/modules/profile";

const ProfileLike = () => {
  const dispatch = useDispatch();
  const liketrils_post = useSelector((state) => state.profile.like_trils_data);
  const liketrilog_post = useSelector(
    (state) => state.profile.like_trilog_data
  );

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(profileActions.likeTrilsLoad());
    dispatch(profileActions.likeTrilogLoad());
  }, []);

  return (
    <React.Fragment>
      {modal ? <TrilsDetail history={history} /> : null}
      <ColumnWrap>
        <Wrap>
          <Icon></Icon>
          <ColumnWrap>
            <Title>좋아요</Title>
            <Div>
              <Title style={{ marginLeft: "-1.5rem" }}>Trils</Title>
              <Button>더보기</Button>
            </Div>
            <Postlist>
              {!liketrils_post || liketrils_post.length === 0 ? (
                <div>내가 좋아요한 Trils가 없습니다.</div>
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
              <Postlist>
                {!liketrilog_post || liketrilog_post.length === 0 ? (
                  <div>내가 좋아요한 Trilog가 없습니다.</div>
                ) : (
                  <>
                    {" "}
                    {liketrilog_post.map((val, idx) => {
                      const index = idx + 1;

                      if (index % 5 === 0) {
                        return (
                          <BoardCard
                            data={val}
                            key={index}
                            margin="50px 20px 0 0"
                          />
                        );
                      } else {
                        return (
                          <BoardCard
                            data={val}
                            key={index}
                            margin="50px 20px 0 0"
                          />
                        );
                      }
                    })}
                  </>
                )}
              </Postlist>
            </Wrap>
          </ColumnWrap>
        </Wrap>
      </ColumnWrap>
    </React.Fragment>
  );
};

export default ProfileLike;

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
  background-image: url("${DmyLike}");
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
