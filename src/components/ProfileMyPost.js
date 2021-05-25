import React, { useState } from "react";
import styled from "styled-components";

import Video from "components/PostVideo";
import TrilsDetail from "../components/trils/TrilsDetail";
import { BoardCard } from "components/components";

import { history } from "redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as TrilogActions } from "redux/modules/trilog";
import { TrilsActions } from "redux/modules/trils";
import { Fragment } from "react";

const ProfileMyPost = () => {
  const dispatch = useDispatch();
  const mytrils_post = useSelector((state) => state.trils.data);
  const mytrilog_post = useSelector((state) => state.trilog.main.list);
  const [trilsindex, setTrilsIndex] = useState(4);
  const [trilogindex, setTrilogIndex] = useState(5);

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
          <ColumnWrap>
            <Div>
              <Title>Trils</Title>
            </Div>
            <Postlist type="trils">
              {!mytrils_post || mytrils_post.length === 0 ? (
                <Text>내 Trils가 없습니다.</Text>
              ) : (
                <>
                  {mytrils_post.map((p, idx) => {
                    return (
                      <Fragment key={idx}>
                        <Video {...p}  history={history} />
                      </Fragment>
                    );
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
              </Div>
              <Postlist type="trilog">
                {!mytrilog_post || mytrilog_post.length === 0 ? (
                  <Text>내 Trilog가 없습니다.</Text>
                ) : (
                  <>
                    {mytrilog_post.map((val, idx) => {
                      const index = idx + 1;
                      if (idx <= trilogindex) {
                        if (index % 5 === 0) {
                          return (
                            <BoardCard data={val} margin="50px 20px 50px 0" />
                          );
                        } else {
                          return (
                            <BoardCard data={val} margin="50px 20px 50px 0" />
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
  @media (max-width: 540px) {
    justify-content: center;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
  margin: 0 auto;
  @media (max-width: 540px) {
    margin-left: 3rem;
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
  cursor: pointer;
  @media (max-width: 540px) {
    margin-right: 2rem;
  }
`;

const Br = styled.div`
  width: 80%;
  height: 3rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  border-bottom: 3px solid #89acff;
  @media (max-width: 540px) {
    margin-left: 2.5rem;
    width: 85%;
  }
  @media (max-width: 375px) {
    margin-left: 2rem;
    width: 85%;
  }
`;

const Postlist = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 16px;
  grid-auto-flow: column;
  grid-auto-columns: ${(props) =>
    props.type === "trils" ? "minmax(400px, 400px)" : "minmax(224px, 224px)"};
  overflow-x: auto;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 540px) {
    width: 95%;
    /* margin-left: 2rem; */
    /* justify-content: center; */
  }

  @media (max-width: 540px) {
    width: 85%;
    /* margin-left: 2rem; */
    /* justify-content: center; */
  }
  @media (max-width: 375px) {
    /* margin-left: 2rem; */
    width: 85%;
    /* justify-content: center; */
  }
`;

const Text = styled.div`
  margin-left: 6rem;
`;
