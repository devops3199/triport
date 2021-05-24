import React, { useEffect, useRef, useState, Fragment } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import { MODAL_STATUS } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { TrilsActions, DELETE_POST, EDIT_POST } from "redux/modules/trils";
import Swal from "sweetalert2";
import ClearIcon from "@material-ui/icons/Clear";
import { config } from "../../redux/modules/config";
import uploading from "../../media/image/uploading.png";

const TrilsDetailTutorialM = (props) => {
  const { history } = props;
  const player = useRef(null);
  const players = useRef(null);
  const info = props.info;
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [editOn, setEditOn] = useState(false);
  const [tags, setTags] = useState(info.information.hashtag);
  const tagInput = useRef(null);
  const [mute, setMute] = useState(false);
  const [tagType, setTagType] = useState("");
  const [like_chk, setLike] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(false);
  const [iphonePlaying, setIphonePlaying] = useState(true);
  const check = navigator.userAgent.toLowerCase();
  const is_iphone = check.indexOf("iphone") !== -1;

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags([...newTags]);
  };

  const InputKeyDown = (e) => {
    const val = e.target.value;
    if (
      (e.key === "Enter" && val) ||
      (e.key === "," && val) ||
      (e.key === " " && val)
    ) {
      if (tags.length === 3) {
        alert("태그는 최대 3개까지 가능합니다.");
        return;
      }
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTagType("");
      setTags([...tags, val]);
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  const closeModal = () => {
    history.goBack();
  };

  const params = {
    src: info.information.videoUrl,
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

  const m3u8 = () => {
    if (player.current.readyState !== 4) {
      return;
    }
    if (!info.information.posPlay) {
      return;
    }
    if (nowPlaying) {
      setNowPlaying(false);
      player.current.pause();
    } else {
      setNowPlaying(true);
      player.current.play();
    }
  };

  const mp4 = () => {
    if (players.current.readyState !== 4) {
      return;
    }
    if (!info.information.posPlay) {
      return;
    }
    if (nowPlaying) {
      setNowPlaying(false);
      players.current.pause();
    } else {
      setNowPlaying(true);
      players.current.play();
    }
  };

  const like = () => {
    if (like_chk) {
      setLike(false);
    } else {
      setLike(true);
    }
  };

  const del = () => {
    Swal.fire({
      title: "사용자 가이드",
      text: "사용자 가이드에서는 삭제 기능이 없습니다.",
      confirmButtonText: "확인",
    });
  };

  const hash = (e) => {
    Swal.fire({
      title: "사용자 가이드",
      text: "해시태그를 클릭하면 해시태그를 검색 할 수 있습니다.",
      confirmButtonText: "확인",
    });
  };

  const edit = () => {
    setEditOn(true);
  };

  const cancelEdit = () => {
    setTags(info.information.hashtag);
    setEditOn(false);
  };

  const doEdit = () => {
    if (tags.length === 0) {
      alert("태그를 1개 이상 작성해주세요");
      return;
    }
    setEditOn(false);
  };

  const change = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
    }
    const curValue = e.target.value;
    const regExp = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"\s]/gi;
    // const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
    const newValue = curValue.replace(regExp, "");
    setTagType(newValue);
  };

  const iphone = (e) => {
    if (e.target.readyState !== 4) {
      return;
    }
    if (!info.information.posPlay) {
      return;
    }
    if (iphonePlaying) {
      setIphonePlaying(false);
      setMute(false);
      e.target.pause();
    } else {
      setIphonePlaying(true);
      setMute(true);
      e.target.play();
    }
  };

  return (
    <React.Fragment>
      <Wrap>
        <Profile>
          <ProfileImg src={info.author.profileImgUrl} />
          <ProfileId>{info.author.nickname}</ProfileId>
        </Profile>
        {is_iphone ? (
          <View onClick={iphone}>
            <VideoPlay
              src={params.src}
              loop
              autoPlay
              muted={mute}
              playsInline
            />
          </View>
        ) : (
          <>
            {info.information.posPlay ? (
              <>
                {info.information.videoType.toLowerCase() === "mp4" ||
                info.information.videoType.toLowerCase() === "mov" ? (
                  <View onClick={mp4}>
                    <VideoPlay
                      ref={players}
                      src={params.src}
                      loop
                      onTimeUpdate={() => {
                        setCompleted(
                          (players.current.currentTime /
                            players.current.duration) *
                            100
                        );
                        setProgress(players.current.clientWidth);
                      }}
                    />
                  </View>
                ) : (
                  <>
                    <View onClick={m3u8}>
                      <VideoPlay
                        ref={player}
                        loop
                        onTimeUpdate={() => {
                          setCompleted(
                            (player.current.currentTime /
                              player.current.duration) *
                              100
                          );
                          setProgress(player.current.clientWidth);
                        }}
                      />
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                <View>
                  <Uploading src={uploading} />
                </View>
              </>
            )}
          </>
        )}
        <Progress width={progress}>
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
        </Progress>
        <LowWrap>
          <LikeCov onClick={like}>
            {like_chk ? <HeartFill /> : <HeartEmpty />}
          </LikeCov>
          <LikeText>좋아요 +{info.information.likeNum}</LikeText>
          <Tag>
            {editOn ? (
              <>
                {tags.map((tag, i) => (
                  <Li key={tag}>
                    #{tag}
                    <Libutton
                      type="button"
                      onClick={() => {
                        removeTag(i);
                      }}
                    >
                      <IconCover>
                        <ClearIcon />
                      </IconCover>
                    </Libutton>
                  </Li>
                ))}
              </>
            ) : (
              <>
                {info.information.hashtag.map((p, idx) => {
                  return (
                    <Fragment key={idx}>
                      <Hash id={p} onClick={hash}>
                        #{p}
                      </Hash>
                    </Fragment>
                  );
                })}
              </>
            )}
          </Tag>
        </LowWrap>
        {editOn ? (
          <InputTag>
            <Input
              type="text"
              maxLength={10}
              value={tagType}
              onKeyDown={InputKeyDown}
              ref={tagInput}
              placeholder="# 자유롭게 적고 엔터를 눌러주세요.(10자 제한)"
              onChange={change}
            ></Input>
          </InputTag>
        ) : (
          <></>
        )}
        <Bottom>
          {editOn ? (
            <>
              <Edit onClick={doEdit}>수정완료</Edit>
              <Delete onClick={cancelEdit}>수정취소</Delete>
            </>
          ) : (
            <>
              {info.member.isMembers ? (
                <>
                  <Edit onClick={edit}>수정하기</Edit>
                  <Delete onClick={del}>삭제하기</Delete>
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <Close onClick={closeModal}>뒤로가기</Close>
        </Bottom>
      </Wrap>
    </React.Fragment>
  );
};

TrilsDetailTutorialM.defaultProps = {
  info: {
    information: {
      id: 0,
      likeNum: 0,
      modifiedAt: "2021-05-20 00:00",
      videoType: "m3u8",
      videoUrl:
        "https://d1nogx3a73keco.cloudfront.net/video/tutorials/tutorials.m3u8",
      posPlay: true,
      hashtag: ["화면을 클릭하면", "재생/일시정지가 가능합니다."],
    },
    author: {
      nickname: "트리포트",
      profileImgUrl:
        "https://d1nogx3a73keco.cloudfront.net/profileImage/20210518170253-tripper_with_logo_kakao.png",
    },
    member: { isMembers: true, isLike: false },
  },
};

const Close = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
  margin-left: 1rem;
`;

const Delete = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
  margin-left: 1rem;
`;

const Edit = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 5rem;
  height: 2rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 1rem;
  @media only screen and (max-width: 425px) {
    justify-content: center;
    margin-right: 0rem;
  }
`;

const Input = styled.input`
  outline: none;
  width: 100%;
  height: 2.5rem;
  border: 0;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  /* margin: 0px auto; */
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 1rem;
`;

const InputTag = styled.div`
  width: calc(100% - 30px);
  height: 100%;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px auto;
  padding: 5px;
  margin-bottom: 1rem;
`;

const Hash = styled.div`
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

const IconCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 1rem;
  }
`;

const Libutton = styled.div`
  display: inline-flex;
  align-items: center;
  appearance: none;
  background: #333333;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 12px;
  height: 15px;
  justify-content: center;
  line-height: 0;
  margin-left: 8px;
  padding: 0;
  width: 15px;
  outline: 0;
`;

const Li = styled.div`
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 1rem;
  font-family: "AppleSDGothicNeoR";
  color: blue;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LikeText = styled.div`
  color: #8b8888;
  width: 5rem;
  user-select: none;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 388px) {
    font-size: 0.8rem;
  }
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

const LowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Progress = styled.div`
  margin: 0 auto;
  width: ${(props) => props.width}px;
`;

const Uploading = styled.div`
  display: flex;
  height: 20rem;
  width: 40rem;
  margin: 0 auto;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const VideoPlay = styled.video`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-width: 40rem;
  max-height: 30rem;
  object-fit: contain;
`;

const View = styled.div`
  max-width: 50rem;
  max-height: 30rem;
  width: calc(100% - 30px);
  height: auto;
  min-width: 10rem;
  min-height: 20rem;
  background-color: #ededed;
  /* background-color: #ededed; */
  display: flex;
  justify-content: center;
  margin: 0px auto;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 2rem;
`;

const Profile = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-bottom: 1rem;
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
`;

export default TrilsDetailTutorialM;
