import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";

const Video = ({ url }) => {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const vidRef = useRef();

  const onVideoClick = () => {
    vidRef.current.play();
    setisVideoPlaying(true);
  };

  const ovVideoOut = () => {
    vidRef.current.pause();
    setisVideoPlaying(false);
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
        onMouseLeave={ovVideoOut}
        onMouseOver={onVideoClick}
        ref={vidRef}
        src={url}
        muted={true}
        loop
      />
      <Slider
        min={1}
        max={3}
        step={0.1}
        value={volume}
        onChange={(e, volume) => setVolume(volume)}
      />
    </VideoCards>
  );
};

const VideoCards = styled.div`
  position: relative;
`;

const VideoPlay = styled.video`
  height: 100%;
  width: 100%;
`;

export default Video;
