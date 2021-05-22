import React, { useRef, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import Uploadex from "../../media/image/upload_ex.png";
import Swal from "sweetalert2";

const TrilsTutorial = (props) => {
  const { open, history } = props;
  const player = useRef(null);
  const players = useRef(null);
  const [completed, setCompleted] = useState(0);
  const check = navigator.userAgent.toLowerCase();
  const is_iphone = check.indexOf("iphone") !== -1;

  const params = {
    src: props.information.videoUrl,
  };

  useEffect(() => {
    if (is_iphone) {
      return;
    }
    const hls = new Hls();
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
  }, [params.src]);

  const hlsplay = () => {
    if (player.current.readyState !== 4) {
      return;
    }
    player.current.play();
  };

  const hlspause = () => {
    if (player.current.readyState !== 4) {
      return;
    }
    player.current.pause();
  };

  const mp4play = () => {
    if (players.current.readyState !== 4) {
      return;
    }
    players.current.play();
  };

  const mp4pause = () => {
    if (players.current.readyState !== 4) {
      return;
    }
    players.current.pause();
  };

  const like = () => {
    Swal.fire({
      title: "좋아요 기능",
      text: "로그인 후 좋아요를 누를 수 있습니다.",
      confirmButtonText: "확인",
    });
  };

  const mobile_chk = () => {
    history.push("/trils/tutorial");
  };

  return (
    <VideoCards>
      <Profile>
        <ProfileImg src={props.author.profileImgUrl} />
        <ProfileId>{props.author.nickname}</ProfileId>
      </Profile>
      {is_iphone ? (
        <VideoPlay src={params.src} loop autoPlay muted playsInline />
      ) : (
        <>
          {props.information.posPlay ? (
            <>
              {props.information.videoType === "mp4" ||
              props.information.videoType === "mov" ? (
                <>
                  <VideoPlay
                    onMouseOver={mp4play}
                    onMouseLeave={mp4pause}
                    ref={players}
                    src={params.src}
                    muted
                    loop
                    onTimeUpdate={() => {
                      setCompleted(
                        (players.current.currentTime /
                          players.current.duration) *
                          100
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <VideoPlay
                    onMouseOver={hlsplay}
                    onMouseLeave={hlspause}
                    ref={player}
                    muted
                    loop
                    onTimeUpdate={() => {
                      setCompleted(
                        (player.current.currentTime / player.current.duration) *
                          100
                      );
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Uploading src={Uploadex} />
            </>
          )}
        </>
      )}
      <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
      <PostBottom>
        <BottomCov>
          <LikeCov onClick={like}>
            {props.member.isLike ? <HeartFill /> : <HeartEmpty />}
          </LikeCov>
        </BottomCov>
        <PostLikeCnt>좋아요 +{props.information.likeNum}</PostLikeCnt>
        <PostUserComment>
          {props.information.hashtag.map((p, idx) => {
            return (
              <Fragment key={idx}>
                <Hash>#{p}</Hash>
              </Fragment>
            );
          })}
        </PostUserComment>
      </PostBottom>
      {window.innerWidth > 1024 ? (
        <TutorialBg
          onMouseOver={hlsplay}
          onMouseLeave={hlspause}
          onClick={open}
        >
          <TutorialTextCover>
            <TutirialText>커서를 올리면</TutirialText>
            <TutirialText>영상이 재생됩니다.</TutirialText>
          </TutorialTextCover>
          <TutorialTextCover>
            <TutirialText2>화면을 클릭하면</TutirialText2>
            <TutirialText2>화면을 크게</TutirialText2>
            <TutirialText2>볼 수 있습니다.</TutirialText2>
          </TutorialTextCover>
        </TutorialBg>
      ) : (
        <>
          <TutorialBgM onClick={mobile_chk}>
            <TutorialTextCover>
              <TutirialText>화면을 클릭하면</TutirialText>
              <TutirialText>화면을 크게</TutirialText>
              <TutirialText>볼 수 있습니다.</TutirialText>
            </TutorialTextCover>
          </TutorialBgM>
        </>
      )}
    </VideoCards>
  );
};

const TutorialBgM = styled.div`
  display: flex;
  position: relative;
  height: 45rem;
  width: 25rem;
  margin-top: -47.6rem;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TutorialTextCover = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

TrilsTutorial.defaultProps = {
  information: {
    id: 1,
    likeNum: 3000,
    modifiedAt: "2021-05-14 00:00",
    videoType: "m3u8",
    videoUrl:
      "https://d1nogx3a73keco.cloudfront.net/video/tutorials/tutorials.m3u8",
    posPlay: true,
    hashtag: ["트리포트", "사용자가이드"],
  },
  author: {
    nickname: "Triport.kr",
    profileImgUrl: "https://i.ibb.co/MDKhN7F/kakao-11.jpg",
  },
  member: { isMembers: false, isLike: true },
};

const TutorialBg = styled.div`
  display: flex;
  position: relative;
  height: 45rem;
  width: 25rem;
  margin-top: -47.6rem;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  :hover {
    & > :first-child > div {
      opacity: 0;
    }
    & > :last-child > div {
      opacity: 1;
    }
  }
`;

const TutirialText = styled.div`
  user-select: none;
  opacity: 1;
  color: white;
  z-index: 12;
  font-size: 3rem;
  transition: all 0.3s ease-in-out;
`;

const TutirialText2 = styled.div`
  user-select: none;
  opacity: 0;
  color: white;
  z-index: 12;
  font-size: 3rem;
  transition: all 0.3s ease-in-out;
`;

const Uploading = styled.div`
  display: flex;
  height: 45rem;
  width: 25rem;
  margin: 0 auto;
  background-image: url("${(props) => props.src}");
  background-size: contain;
`;

const Hash = styled.div`
  user-select: none;
  margin-left: 0.5rem;
  font-family: "AppleSDGothicNeoR";
  color: blue;
`;

const PostBottom = styled.div`
  margin-top: 1rem;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
`;

const PostLikeCnt = styled.div`
  font-family: "AppleSDGothicNeoR";
  display: flex;
  user-select: none;
`;

const PostUserComment = styled.div`
  font-family: "AppleSDGothicNeoR";
  display: flex;
  margin-left: 18px;
  cursor: pointer;
`;

const VideoCards = styled.div`
  display: flex;
  max-width: 25rem;
  flex-direction: column;
  margin-bottom: 1.5rem;
  ${(props) => (props.margin ? "margin-right:2.5rem" : "")};
  margin-top: 1rem;
  transition: 0.5s ease-in-out;
  @media only screen and (min-width: 1024px) {
    :hover {
      transform: scale(1.03);
    }
  }
  box-shadow: 0px 3px 6px #00000029;
`;

const VideoPlay = styled.video`
  display: flex;
  height: 45rem;
  width: 25rem;
  margin: 0 auto;
  object-fit: cover;
`;

const Profile = styled.div`
  user-select: none;
  margin-bottom: -3rem;
  display: flex;
  z-index: 5;
`;

const ProfileImg = styled.div`
  --size: 38px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-position: center;
  background-image: url(${(props) => props.src});
  background-color: white;
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
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
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
const BottomCov = styled.div`
  display: flex;
  margin-right: 0.7rem;
`;

export default TrilsTutorial;
