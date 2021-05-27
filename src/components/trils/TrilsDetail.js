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
import TrilsUploadingDetail from "../../media/image/trils_upload_detail.png";

const TrilsDetail = (props) => {
  const { history } = props;
  const player = useRef(null);
  const players = useRef(null);
  const info = useSelector((state) => state.trils.detail);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [editOn, setEditOn] = useState(false);
  const [tags, setTags] = useState(info.information.hashtag);
  const tagInput = useRef(null);
  const [mute, setMute] = useState(true);
  const [tagType, setTagType] = useState("");

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
      if (tags.length === 10) {
        Swal.fire({
          icon: 'warning',
          title: '알림',
          text: '태그는 최대 10개까지 가능합니다.',
          confirmButtonText: '확인'
        })
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
    dispatch(MODAL_STATUS(false));
  };

  const params = {
    src: info.information.videoUrl,
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
    if (!info.information.posPlay) {
      return;
    }
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
    }
  };

  const searchMember = (e) => {
    e.stopPropagation();
    closeModal();
    history.push(`/trils/member/${info.author.authorId}`);
  };

  const mp4volume = () => {
    if (players.current.readyState !== 4) {
      return;
    }
    if (!info.information.posPlay) {
      return;
    }
    if (mute) {
      setMute(false);
    } else {
      setMute(true);
    }
  };

  const like = () => {
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
      dispatch(TrilsActions.send_like(info.information.id, info.member.isLike));
    }
  };

  const del = () => {
    Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      text: "게시글 삭제 시 다시 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const access_token = localStorage.getItem("access_token");
        const url = `${config}/api/posts/${info.information.id}`;
        const data = {
          method: "DELETE",
          headers: {
            Authorization: `${access_token}`,
          },
        };
        fetch(url, data)
          .then((result) => {
            return result.json();
          })
          .then((result) => {
            if (result.ok) {
              dispatch(DELETE_POST(info.information.id));
              Swal.fire({
                icon: 'success',
                title: '삭제 완료!',
                text: '게시글이 삭제되었습니다.',
                confirmButtonText: '확인'
              }).then(() => {
                closeModal();
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const hash = (e) => {
    closeModal();
    history.push(`/search?q=${e.target.id}&filter=likeNum`, 1);
  };

  const edit = () => {
    setEditOn(true);
  };

  const cancelEdit = () => {
    setEditOn(false);
  };

  const doEdit = () => {
    if (tags.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        text: '태그를 1개 이상 작성해주세요.',
        confirmButtonText: '확인'
      })
      return;
    }
    const access_token = localStorage.getItem("access_token");
    const url = `${config}/api/posts/${info.information.id}`;
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        hashtag: tags,
      }),
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.ok) {
          const data = {
            id: info.information.id,
            hashtag: tags,
          };
          dispatch(EDIT_POST(data));
          setEditOn(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const change = (e) => {
    if (e.target.value.length > 8) {
      e.target.value = e.target.value.substr(0, 8);
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

  return (
    <React.Fragment>
      <Component
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={closeModal}
      />
      <Wrap width={window.innerWidth} height={window.innerHeight}>
        <Profile onClick={searchMember}>
          <ProfileImg src={info.author.profileImgUrl} />
          <ProfileId>{info.author.nickname}</ProfileId>
        </Profile>

        {info.information.posPlay ? (
          <>
            {info.information.videoType.toLowerCase() === "mp4" ||
            info.information.videoType.toLowerCase() === "mov" ? (
              <View
                onMouseOver={mp4play}
                onMouseLeave={mp4pause}
                onClick={mp4volume}
              >
                <VideoPlay
                  ref={players}
                  src={params.src}
                  muted={mute}
                  loop
                  autoPlay
                  onTimeUpdate={() => {
                    setCompleted(
                      (players.current.currentTime / players.current.duration) *
                        100
                    );
                    setProgress(players.current.clientWidth);
                  }}
                />
              </View>
            ) : (
              <>
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
                        (player.current.currentTime / player.current.duration) *
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
              <Uploading src={TrilsUploadingDetail} />
            </View>
          </>
        )}
        <Progress width={progress}>
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
        </Progress>
        <LowWrap>
          <LikeCov onClick={like}>
            {info.member.isLike ? <HeartFill /> : <HeartEmpty />}
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
              maxLength={8}
              value={tagType}
              onKeyDown={InputKeyDown}
              ref={tagInput}
              placeholder="# 자유롭게 적고 엔터를 눌러주세요.(8자 제한)"
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
          <Close onClick={closeModal}>닫기</Close>
        </Bottom>
      </Wrap>
    </React.Fragment>
  );
};

const LikeText = styled.div`
  color: #8b8888;
  width: 5rem;
  user-select: none;
  display: flex;
  align-items: center;
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

  @media (max-width: 768px) {
    max-width: 35rem;
    max-height: 30rem;
  }

  @media (max-width: 600px) {
  }
  @media (max-width: 540px) {
    width: 30rem;
    max-height: 50rem;
  }
  @media (max-width: 415px) {
  }
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

  @media (max-width: 768px) {
    max-width: 35rem;
    max-height: 30rem;
  }

  @media (max-width: 600px) {
    max-width: 32rem;
    max-height: 30rem;
  }
  @media (max-width: 540px) {
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    max-height: ${(props) => props.height}px;
    max-width: ${(props) => props.width}px;
  }
  @media (max-width: 415px) {
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
  }
`;

const LowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Profile = styled.div`
  cursor: pointer;
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
  border: 1px solid #ededed;
`;

const ProfileId = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 11px;
  align-items: center;
`;

const View = styled.div`
  max-width: 50rem;
  max-height: 30rem;
  width: auto;
  height: auto;
  min-width: 40rem;
  min-height: 20rem;
  background-color: #ededed;
  /* background-color: #ededed; */
  display: flex;
  justify-content: center;
  margin: 0px auto;

  @media (max-width: 768px) {
    max-width: 30rem;
    max-height: 30rem;
    min-width: 30rem;
  }

  @media (max-width: 600px) {
    max-width: 28rem;
    max-height: 30rem;
    min-width: 28rem;
  }
  @media (max-width: 540px) {
    max-width: 18rem;
    max-height: 30rem;
    min-width: 18rem;
  }
  @media (max-width: 415px) {
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

const Tag = styled.div`
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default TrilsDetail;
