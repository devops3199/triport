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
import { TrilsActions } from "redux/modules/trils";

const ProfileMyPost = () => {
  const dispatch = useDispatch();
  const mytrils_post = useSelector((state) => state.trils.data);
  const mytrilog_post = useSelector((state) => state.trilog.main.list);
  const [trilsindex, setTrilsIndex] = useState(2);
  const [trilogindex, setTrilogIndex] = useState(2);

  const modal = useSelector((state) => state.trils.modal);

  React.useEffect(() => {
    dispatch(TrilsActions.getMyTrilsPost());
    dispatch(TrilogActions.getTrilogMainMyPage());
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
              <Button
                onClick={(e) => {
                  e.target.style.display = "none";
                  setTrilsIndex(mytrils_post.length);
                }}
              >
                더보기
              </Button>
            </Div>
            <Postlist>
              {!mytrils_post || mytrils_post.length === 0 ? (
                <div>내 Trils가 없습니다.</div>
              ) : (
                <>
                  {mytrils_post.map((p, idx) => {
                    if (idx <= trilsindex) {
                      if ((idx + 1) % 3 !== 0) {
                        return <Video {...p} history={history} mr />;
                      } else {
                        return <Video {...p} history={history} />;
                      }
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
              <Button
                onClick={(e) => {
                  e.target.style.display = "none";
                  setTrilogIndex(mytrilog_post.length);
                }}
              >
                더보기
              </Button>
            </Div>
            <Wrap
              style={{
                width: "78rem",
                marginBottom: "5rem",
              }}
            >
              <Postlist>
                {!mytrilog_post || mytrilog_post.length === 0 ? (
                  <div>내 Trilog가 없습니다.</div>
                ) : (
                  <>
                    {mytrilog_post.map((val, idx) => {
                      const index = idx + 1;
                      if (idx <= trilogindex) {
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

export default ProfileMyPost;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: "paybooc-Bold";
  width: 100vw;
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
  cursor: pointer;
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
