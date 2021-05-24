import React, { useEffect, useRef, useState, Fragment } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import Swal from "sweetalert2";
import ClearIcon from "@material-ui/icons/Clear";

const TrilsDetailTutorial = (props) => {
  const { close } = props;
  const player = useRef(null);
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [editOn, setEditOn] = useState(false);
  const [tags, setTags] = useState(props.information.hashtag);
  const tagInput = useRef(null);
  const [mute, setMute] = useState(true);
  const [tagType, setTagType] = useState("");
  const [like_chk, setLike] = useState(false);

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
    close();
  };

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

  const m3u8volume = () => {
    if (player.current.readyState !== 4) {
      return;
    }
    if (!props.information.posPlay) {
      return;
    }
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
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
    setTags(props.information.hashtag);
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

  return (
    <React.Fragment>
      <Component
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={closeModal}
      />
      <Wrap>
        <Profile>
          <ProfileImg src={props.author.profileImgUrl} />
          <ProfileId>{props.author.nickname}</ProfileId>
        </Profile>
        <View
          onMouseOver={hlsplay}
          onMouseLeave={hlspause}
          onClick={m3u8volume}
        >
          <VideoPlay
            ref={player}
            muted={mute}
            loop
            autoPlay
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
            {like_chk ? <HeartFill /> : <HeartEmpty />}
          </LikeCov>
          <LikeText>좋아요 +{props.information.likeNum}</LikeText>
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
                {tags.map((p, idx) => {
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
              {props.member.isMembers ? (
                <>
                  <Edit onClick={edit}>수정하기</Edit>
                  <Delete onClick={del}>삭제하기</Delete>
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <Close onClick={closeModal}>닫기</Close>
        </Bottom>
      </Wrap>
    </React.Fragment>
  );
};

TrilsDetailTutorial.defaultProps = {
  information: {
    id: 1,
    likeNum: 0,
    modifiedAt: "2021-05-14 00:00",
    videoType: "m3u8",
    videoUrl:
      "https://d1nogx3a73keco.cloudfront.net/video/tutorials/tutorials.m3u8",
    posPlay: true,
    hashtag: [
      "영상을 클릭하면 소리도 들을 수 있습니다",
      "해시태그를 클릭하면 관련된 해시태그를 검색할 수 있습니다.",
    ],
  },
  author: {
    nickname: "Triport.kr",
    profileImgUrl: "https://i.ibb.co/MDKhN7F/kakao-11.jpg",
  },
  member: { isMembers: true, isLike: false },
};

const LikeText = styled.div`
  color: #8b8888;
  width: 5rem;
  user-select: none;
  display: flex;
  align-items: center;
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
  min-width: 30rem;
  width: 100%;
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

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
  width: 8rem;
  height: 3rem;
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
  width: 8rem;
  height: 3rem;
  margin-left: 1rem;
`;

const Close = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 8rem;
  height: 3rem;
  margin-left: 1rem;
`;

const Progress = styled.div`
  margin: 0 auto;
  width: ${(props) => props.width}px;
`;

const VideoPlay = styled.video`
  display: flex;
  margin: 0 auto;
  max-width: 50rem;
  max-height: 30rem;
  object-fit: contain;
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

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: black;
  z-index: 60;
  opacity: 0.4;
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 70;
  background-color: white;
  max-width: 57rem;
  max-height: 45rem;
  display: flex;
  flex-direction: column;
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
  margin-left: 1rem;
  margin-top: 1rem;
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

const View = styled.div`
  width: 50rem;
  height: 28.125rem;
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

const Tag = styled.div`
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default TrilsDetailTutorial;
