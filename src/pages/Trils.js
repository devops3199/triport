import Video from "components/trills/Video";
import React from "react";
import styled from "styled-components";

const ReelsTest = () => {

  return (
    <CenterDiv>
      <Video />
      <Video />
      <Video />
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

export default ReelsTest;
