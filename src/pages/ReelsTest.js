import Video from "components/Video";
import React from "react";
import styled from "styled-components";
// import Video1 from "../media/test.mp4";

const ReelsTest = () => {
  return (
    <Test>
      <CenterDiv>
        <InstaLogo>
          <ImgLogo />
        </InstaLogo>
        <h3>Reel</h3>
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
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
`;

const InstaLogo = styled.div`
  width: 50%;
`;

const ImgLogo = styled.div``;

const VideoContainer = styled.div`
  height: 15vh;
  width: 20vw;
  max-width: 500px;
  border-radius: 20px;
  background-color: white;
`;

export default ReelsTest;
