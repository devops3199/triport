import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import {
  HeartEmpty,
  HeartFill,
  BookmarkEmpty,
  BookmarkFill,
  Cmt,
} from "media/svg/Svg";

const Video = () => {
  const hls = new Hls();
  const player = useRef(null);
  const [ismuted, setMute] = useState(false);
  const [completed, setCompleted] = useState(0);

  const params = {
    src: "http://d2vii12zy6qnjo.cloudfront.net/test/test.m3u8",
  };

  useEffect(() => {
    if (hls === undefined) {
      return;
    }
    if (Hls.isSupported()) {
      hls.attachMedia(player.current);
      hls.config.debug = false;

      hls.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
        hls.loadSource(params.src);
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log("네트워크 오류");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("미디어 오류");
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => hls.destroy();
    } else if (player.current.canPlayType("application/vnd.apple.mpegurl")) {
      player.current.src = params.src;
      player.current.addEventListener("loadedmetadata", () => {
        player.current.play();
      });
    }
  }, []);

  const videoplay = () => {
    player.current.play();
  };

  const videopause = () => {
    player.current.pause();
  };

  return (
    <VideoCards onMouseOver={videoplay} onMouseLeave={videopause}>
      <Profile>
        <ProfileImg />
        <ProfileId>Triport</ProfileId>
      </Profile>
      <VideoPlay
        ref={player}
        muted
        loop
        onTimeUpdate={() => {
          setCompleted(
            (player.current.currentTime / player.current.duration) * 100
          );
        }}
      />
      <VideoBg />
      <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
      <BottomCov>
          <LikeCov>
            <HeartFill />
          </LikeCov>
      </BottomCov>
    </VideoCards>
  );
};

const VideoCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoPlay = styled.video`
  display: flex;
  height: 25rem;
  width: 14rem;
  margin: 0 auto;
  object-fit: cover;
`;

const VideoBg = styled.div`
  display: flex;
  height: 25rem;
  width: 25rem;
  border-radius: 20px;
  background: beige;
  margin-top: -25rem;
  z-index: -99;
`;

const Profile = styled.div`
  margin-bottom: -3rem;
  display: flex;
  z-index: 50;
`;

const ProfileImg = styled.div`
  --size: 38px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-position: center;
  background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  background-size: cover;
  margin-left: 16px;
  display: flex;
`;

const ProfileId = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 11px;
  align-items: center;
  /* background:white; */
  border-radius: 20px;
  width: 100px;
`;

const LikeCov = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  & svg {
    width: 1.5rem;
  }
`;

const CommentCov = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  margin-left: 0.5rem;
  & svg {
    width: 1.5rem;
  }
`;

const LikeComment = styled.div`
  display: flex;
  flex-direction: row;
`;

const BookmarkCov = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  margin-left: 0.5rem;
  & svg {
    width: 1rem;
  }
`;

const BottomCov = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -2.5rem 1rem auto 1rem;
`;

export default Video;
