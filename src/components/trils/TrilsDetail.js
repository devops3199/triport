import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFill } from "media/svg/Svg";
import { CLOSE_MODAL } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";
import Hls from "hls.js";
import ProgressBar from "./ProgressBar";
import { TrilsActions, DELETE_POST } from "redux/modules/trils";
import Swal from "sweetalert2";
import ClearIcon from "@material-ui/icons/Clear";
import { config } from "../../redux/modules/config";

const TrilsDetail = (props) => {
  const { history } = props;
  const hls = new Hls();
  const player = useRef(null);
  const info = useSelector((state) => state.trils.detail);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [editOn, setEditOn] = useState(false);
  const [tags, setTags] = useState(info.information.hashtag);
  const tagInput = useRef(null);
  console.log(info)

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    console.log(newTags);
    setTags([...newTags]);
  };

  const InputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.length === 3) {
        alert("태그는 최대 3개까지 가능합니다.");
        return;
      }
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      tagInput.current.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

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
    }
    dispatch(TrilsActions.send_like(info.information.id, info.member.isLike));
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
              Swal.fire(
                "삭제 완료!",
                "게시글이 삭제되었습니다.",
                "success"
              ).then(() => {
                closeModal();
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const hash = (e) => {
    dispatch(TrilsActions.searchPost(e.target.id, "modifiedAt", 1));
    closeModal();
  };

  const edit = () => {
    setEditOn(true);
  };

  const cancelEdit = () => {
    setEditOn(false);
  };

  const doEdit = () => {
    const access_token = localStorage.getItem("access_token");
    const url = `${config}/api/posts/${info.information.id}`;
    const data = {
      method: "PUT",
      headers: {
        Authorization: `${access_token}`,
      },
      body: {
        hashtag: tags,
      },
    };
    fetch(url, data)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.ok) {
          console.log(result);
        }
      })
      .catch((err) => console.log(err));
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
            {info.member.isLike ? <HeartFill /> : <HeartEmpty />}
          </LikeCov>
          <p style={{ color: "#8B8888", width: "5rem" }}>
            좋아요 +{info.information.likeNum}
          </p>
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
                    <>
                      <Hash id={p} onClick={hash}>
                        #{p}
                      </Hash>
                    </>
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
              onKeyDown={InputKeyDown}
              ref={tagInput}
              placeholder="# 자유롭게 적고 엔터를 눌러주세요."
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

const Li = styled.p`
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
  font-family: "TTTogether";
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
  font-family: "TTTogether";
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
  font-family: "TTTogether";
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
  max-height: 21.5rem;
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
  max-width: 57rem;
  max-height: 37rem;
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
  max-width: 50rem;
  max-height: 21.5rem;
  width: auto;
  height: auto;
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

export default TrilsDetail;
