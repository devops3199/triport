import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";

const Video = ({ url }) => {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");
    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <VideoCards>
      <VideoPlay
        onClick={onVideoClick}
        ref={vidRef}
        src={url}
        // muted={true}
        loop
      />
      {/* <Slider
        min={0}
        max={vidRef.current.duration}
        step={0.1}
        value={vidRef.current.currentTime}
      /> */}
    </VideoCards>
  );
};

const VideoCards = styled.div`
  position: relative;
  display: flex;
`;

const VideoPlay = styled.video`
  display: flex;
  height: 32rem;
  width: 18rem;
  border-radius: 20px;
`;

export default Video;
