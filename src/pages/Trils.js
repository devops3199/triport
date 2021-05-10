import Videom3u8 from "components/trils/Videom3u8";
import Videomp4 from "components/trils/Videomp4";
import React, { useEffect, useState } from "react";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import styled from "styled-components";
import TrilsDetail from "../components/trils/TrilsDetail";
import { all_list } from "../redux/Mock/trils_all_list";
import { TrilsActions } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";

const ReelsTest = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.trils.data);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    dispatch(TrilsActions.getPost());
  },[]);

  return (
    <CenterDiv>
      {modal ? <TrilsDetail close={closeModal} /> : null}
      <FloatingButton
        onClick={() => {
          history.push("/trils/write");
        }}
      >
        <Plus />
      </FloatingButton>
      <PostLine>
        {post_list.map((p, idx) => {
          if ((idx + 1) % 3 !== 0) {
            if (p.information.videoType === "m3u8") {
              return (
                <>
                  <Videom3u8 {...p} mr />
                </>
              );
            } else {
              return (
                <>
                  <Videomp4 {...p} mr />
                </>
              );
            }
          } else {
            if (p.information.videoType === "m3u8") {
              return (
                <>
                  <Videom3u8 {...p} />
                </>
              );
            } else {
              return (
                <>
                  <Videomp4 {...p} />
                </>
              );
            }
          }
        })}
      </PostLine>
    </CenterDiv>
  );
};

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 80rem;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 8%;
  right: 3%;
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 9999;
  & svg {
    width: 100%;
    height: 100%;
    fill: #2b61e1;
  }
`;

const PostLine = styled.div`
  display: flex;
  width: 1280px;
  margin: 0px auto;
  margin-bottom: 4.3rem;
  flex-wrap: wrap;
`;

export default ReelsTest;
