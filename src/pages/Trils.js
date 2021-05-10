import Videom3u8 from "components/trils/Videom3u8";
import Videomp4 from "components/trils/Videomp4";
import React from "react";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import styled from "styled-components";

const ReelsTest = () => {
  return (
    <CenterDiv>
      <FloatingButton
        onClick={() => {
          history.push("/trils/write");
        }}
      >
        <Plus />
      </FloatingButton>
      <Videom3u8 />
      <Videomp4 />
      <Videom3u8 />
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
  bottom: 5%;
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

export default ReelsTest;
