import React, { useRef, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import { useDispatch } from "react-redux";
import { TrilsActions } from "redux/modules/trils";
import Uploadex from "../../media/image/upload_ex.png";
import Swal from "sweetalert2";

const Video = (props) => {
  const { mr, history } = props;
  const player = useRef(null);
  const players = useRef(null);
  const [completed, setCompleted] = useState(0);
  const dispatch = useDispatch();

  const params = {
    src: props.information.videoUrl,
  };

  useEffect(() => {
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

  const openModal = () => {
    dispatch(TrilsActions.getPostDetail(props.information.id));
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
      <Profile>
        <ProfileImg src={props.author.profileImgUrl} />
        <ProfileId>{props.author.nickname}</ProfileId>
      </Profile>
      {props.information.posPlay ? (
        <>
          {props.information.videoType === "mp4" ? (
            <VideoCover>
              <VideoPlay
                onMouseOver={mp4play}
                onMouseLeave={mp4pause}
                ref={players}
                src={params.src}
                muted
                loop
                onTimeUpdate={() => {
                  setCompleted(
                    (players.current.currentTime / players.current.duration) *
                      100
                  );
                }}
              />
            </VideoCover>
          ) : (
            <VideoCover>
              <VideoPlay
                onMouseOver={hlsplay}
                onMouseLeave={hlspause}
                ref={player}
                muted
                loop
                onTimeUpdate={() => {
                  setCompleted(
                    (player.current.currentTime / player.current.duration) * 100
                  );
                }}
              />
            </VideoCover>
          )}
        </>
      ) : (
        <VideoCover>
          <Uploading src={Uploadex} />
        </VideoCover>
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
    </VideoCards>
  );
};

const Uploading = styled.div`
  display: flex;
  height: 45rem;
  width: 25rem;
  margin: 0 auto;
  background-image: url("${(props) => props.src}");
  background-size: contain;
`;

const Hash = styled.div`
  margin-left: 0.5rem;
  font-family: "AppleSDGothicNeoR";
  color: blue;
`;

const PostBottom = styled.div`
  margin-top: 0.7rem;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.7rem;
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
  flex-direction: row;
  flex-wrap: wrap;
`;

const VideoCards = styled.div`
  display: flex;
  max-width: 25rem;
  width: 100%;
  height: 100%;
  flex-direction: column;
  ${(props) => (props.margin ? "margin-right:2.5rem" : "")};
  transition: 0.5s ease-in-out;
  :hover {
    transform: scale(1.03);
  }
  box-shadow: 0px 3px 6px #00000029;
`;

const VideoCover = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const VideoPlay = styled.video`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  object-fit: cover;
`;

const Profile = styled.div`
  user-select: none;
  position: absolute;
  padding-top: 0.7rem;
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

export default Video;
