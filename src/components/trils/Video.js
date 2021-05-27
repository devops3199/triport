import React, { useRef, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import { useDispatch } from "react-redux";
import { TrilsActions } from "redux/modules/trils";
import TrilsUploadMain from "../../media/image/trils_upload_main.png";
import Swal from "sweetalert2";

const Video = (props) => {
  const { mr, history } = props;
  const player = useRef(null);
  const players = useRef(null);
  const [completed, setCompleted] = useState(0);
  const dispatch = useDispatch();
  const check = navigator.userAgent.toLowerCase();
  const is_iphone = check.indexOf("iphone") !== -1;

  const params = {
    src: props.information.videoUrl,
  };

  useEffect(() => {
    if (is_iphone) {
      return;
    }
    const hls = new Hls({ maxBufferLength: 3 });
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

  const autoplay = (target) => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            target.play();
          } else {
            target.pause();
          }
        });
      },
      { threshold: 0.7 }
    );
    io.observe(target);
  };

  useEffect(() => {
    if (window.innerWidth <= 870) {
      const videos = document.querySelectorAll("video");
      videos.forEach(autoplay);
    }
  }, []);

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

  const openModal = () => {
    if (window.innerWidth > 1024) {
      dispatch(TrilsActions.getPostDetail(props.information.id));
    } else {
      dispatch(TrilsActions.getPostDetail(props.information.id, false));
      history.push(`/trils/detail/${props.information.id}`);
    }
  };

  const searchMember=(e)=>{
    e.stopPropagation();
    history.push(`/trils/member/${props.author.authorId}`)
  }

  const hash = (e) => {
    e.stopPropagation();
    history.push(`/search?q=${e.target.id}&filter=likeNum`, 1);
  };

  const like = (e) => {
    e.stopPropagation();
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      Swal.fire({
        title: "로그인을 해주세요.",
        text: "로그인 후 좋아요를 누를 수 있습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "로그인하기",
        cancelButtonText: "닫기",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    } else {
      dispatch(
        TrilsActions.send_like(props.information.id, props.member.isLike)
      );
    }
  };

  return (
    <VideoCards margin={mr} onClick={openModal}>
      <Profile onClick={searchMember}>
        <ProfileImg src={props.author.profileImgUrl} />
        <ProfileId>{props.author.nickname}</ProfileId>
      </Profile>
      {is_iphone ? (
        <VideoPlay src={params.src} loop autoPlay muted playsInline />
      ) : (
        <>
          {props.information.posPlay ? (
            <>
              {props.information.videoType.toLowerCase() === "mp4" ||
              props.information.videoType.toLowerCase() === "mov" ? (
                <>
                  {window.innerWidth > 1024 ? (
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
                  )}
                </>
              ) : (
                <>
                  {window.innerWidth > 1024 ? (
                    <>
                      <VideoPlay
                        onMouseOver={hlsplay}
                        onMouseLeave={hlspause}
                        ref={player}
                        muted
                        loop
                        onTimeUpdate={() => {
                          setCompleted(
                            (player.current.currentTime /
                              player.current.duration) *
                              100
                          );
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <VideoPlay
                        ref={player}
                        muted
                        loop
                        onTimeUpdate={() => {
                          setCompleted(
                            (player.current.currentTime /
                              player.current.duration) *
                              100
                          );
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Uploading src={TrilsUploadMain} />
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
            if (idx < 2) {
              return (
                <Fragment key={idx}>
                  <Hash id={p} onClick={hash}>#{p}</Hash>
                </Fragment>
              );
            }
          })}
        </PostUserComment>
      </PostBottom>
    </VideoCards>
  );
};

const Uploading = styled.img`
  display: flex;
  height: 45rem;
  width: 25rem;
  margin: 0 auto;
  object-fit: contain;
  background-color: #ededed;
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const Hash = styled.div`
  display: flex;
  user-select: none;
  cursor: pointer;
  margin-left: 0.5rem;
  font-family: "AppleSDGothicNeoR";
  color: blue;
  transition: 0.5s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
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
  flex-wrap: wrap;
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
  @media only screen and (max-width: 420px) {
    width: 100%;
  }
  @media only screen and (max-width: 1024px) {
    height: 35rem;
  }
  @media only screen and (max-width: 370px) {
    height: 25rem;
  }
`;

const Profile = styled.div`
  user-select: none;
  position: absolute;
  padding-top: 0.7rem;
  display: flex;
  z-index: 5;
  cursor: pointer;
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
  border: 1px solid #ededed;
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

export default Video;
