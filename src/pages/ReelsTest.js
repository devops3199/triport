import Video from "components/Video";
import React from "react";
import styled from "styled-components";
// import Video1 from "../media/test.mp4";

const ReelsTest = () => {
  return (
    <Test>
      <CenterDiv>
        <VideoContainer>
          <Video
            key="1"
            channel="ccc"
            song="song-3"
            // url={Video1}
            likes="89"
            comment="23"
            shares="29"
          />
        </VideoContainer>{" "}
        <VideoContainer>
          <Video
            key="1"
            channel="ccc"
            song="song-3"
            // url={Video1}
            likes="89"
            comment="23"
            shares="29"
          />
        </VideoContainer>
      </CenterDiv>
    </Test>
  );
};

const Test = styled.div`
  position: relative;
  color: #fff;
`;

const CenterDiv = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  width: 80rem;
`;

const InstaLogo = styled.div``;

const ImgLogo = styled.div``;

const VideoContainer = styled.div`
  max-width: 500px;
  background-color: white;
  margin: 0 auto;
`;

export default ReelsTest;
