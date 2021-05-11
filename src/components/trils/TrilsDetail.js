import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import { CLOSE_MODAL } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { TrilsActions, LIKE_OK } from "redux/modules/trils";

const TrilsDetail = () => {
  const hls = new Hls();
  const player = useRef(null);
  const info = useSelector((state) => state.trils.detail);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const closeModal = () => {
    dispatch(CLOSE_MODAL());
  };

  const params = {
    src: info.information.videoUrl,
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

  const like = () => {
    dispatch(TrilsActions.send_like(info.information.id, info.member.isLike));
  };

  return (
    <React.Fragment>
      <Component onClick={closeModal} />
      <Wrap>
        <Profile>
          <ProfileImg src={info.author.profileImgUrl} />
          <ProfileId>{info.author.nickname}</ProfileId>
        </Profile>
        <View onMouseOver={videoplay} onMouseLeave={videopause}>
          <VideoPlay
            ref={player}
            muted
            loop
            onTimeUpdate={() => {
              setCompleted(
                (player.current.currentTime / player.current.duration) * 100
              );
              setProgress(player.current.clientWidth);
            }}
          />
        </View>
        <Progress width={progress}>
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
        </Progress>
        <LowWrap>
          <LikeCov onClick={like}>
            {info.member.isLike?<HeartFill />:<HeartEmpty />}
          </LikeCov>
          <p style={{ color: "#8B8888" }}>좋아요 +{info.information.likeNum}</p>
          <Tag>
            {info.information.hashtag.map((p, idx) => {
              return (
                <>
                  <Hash>#{p}</Hash>
                </>
              );
            })}
          </Tag>
        </LowWrap>
        <Button>삭제하기</Button>
      </Wrap>
    </React.Fragment>
  );
};

const Progress = styled.div`
  margin: 0 auto;
  width: ${(props) => props.width}px;
`;

const VideoPlay = styled.video`
  display: flex;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
  /* object-fit: cover; */
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

const Hash = styled.div`
  cursor: pointer;
  margin-left: 0.5rem;
  font-family: "AppleSDGothicNeoR";
  color: blue;
  transition: 0.5s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
`;

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
  opacity: 0.4;
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background-color: white;
  width: 57rem;
  height: 37rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  margin: 0px auto;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 3rem;
  z-index: 98;
`;

const LowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 4rem;
  margin-top: 1rem;
`;

const Profile = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 2.5rem;
  margin-bottom: 1rem;
`;

const ProfileImg = styled.div`
  --size: 38px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-position: center;
  background-image: url(${(props) => props.src});
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
`;

const View = styled.div`
  width: 50rem;
  height: 21.5rem;
  background-color: #ededed;
  /* background-color: #ededed; */
  display: flex;
  justify-content: center;
  margin: 0px auto;
`;

const LikeCov = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  & svg {
    width: 1.5rem;
  }
`;

const Tag = styled.p`
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  font-family: "TTTogether";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 20rem;
  height: 3rem;
  margin: 0px auto;
  margin-top: 5rem;
`;

export default TrilsDetail;
