import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import { TrilsActions } from "redux/modules/trils";

const TrilsWrite = (props) => {
  const { history } = props;
  const tagInput = useRef(null);
  const fileInput = useRef();
  const player = useRef(null);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const [vid, setVid] = useState(null);
  const [tagType, setTagType] = useState("");
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    if (!is_login) {
      alert("로그인을 해주세요");
      history.replace("/");
    }
  }, []);

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

  const post = () => {
    if (vid === undefined || vid == null) {
      alert("영상을 업로드해주세요");
      return;
    }
    if (tags.length === 0) {
      alert("태그를 1개 이상 작성해주세요");
      return;
    }
    dispatch(TrilsActions.writepost(vid, tags));
  };

  const upload = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    if (!file) {
      return;
    }
    if (file.size * 9.5367e-7 > 50) {
      alert("용량이 너무 큽니다.(50mb 이하)");
      return;
    }
    reader.onloadstart = (e) => {
      setVid(null);
    };
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setVid(file);
    };
  };

  const triggerVideo = () => {
    fileInput.current.click(); // 인풋 클릭한 효과
  };

  const videoplay = () => {
    if (!player.current) {
      return;
    }
    player.current.play();
  };

  const videopause = () => {
    if (!player.current) {
      return;
    }
    player.current.pause();
  };

  const change = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
    }
    const curValue = e.target.value;
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
    const newValue = curValue.replace(regExp, "");
    setTagType(newValue);
  };

  return (
    <React.Fragment>
      <Wrap>
        <VideoView onClick={triggerVideo}>
          {!(vid === null) ? (
            <Player
              ref={player}
              onMouseOver={videoplay}
              onMouseLeave={videopause}
              src={preview}
              muted
              type="video/mp4"
            />
          ) : (
            <>
              <p style={{ fontSize: "25px" }}>영상을 업로드해주세요.(클릭)</p>
              <p style={{ fontSize: "15px" }}>
                영상 길이 10초 이하, 크기 50MB 이하
              </p>
            </>
          )}
          <input
            type="file"
            accept="video/mp4"
            ref={fileInput}
            onChange={upload}
            style={{ display: "none" }}
          />
        </VideoView>
        <Text>
          {tags.map((tag, i) => (
            <Li key={tag}>
              {tag}
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
        </Text>
        <Tag>태그 (최대 3개)</Tag>
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
      </Wrap>
      <ButtonWrap>
        <Button onClick={post}>작성완료</Button>
        <Button>취소</Button>
      </ButtonWrap>
    </React.Fragment>
  );
};

const Player = styled.video`
  width: 37rem;
  height: 28rem;
  background: black;
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

const Li = styled.li`
  font-family: "AppleSDGothicNeoR";
  align-items: center;
  background: #40c7c3;
  border-radius: 5px;
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 8px;
  padding: 5px 10px;
`;

const InputTag = styled.div`
  width: 37rem;
  height: auto;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px auto;
  padding: 5px;
`;

const Wrap = styled.div`
  font-family: "paybooc-Bold";
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoView = styled.div`
  cursor: pointer;
  z-index: 5;
  width: 37rem;
  height: 28rem;
  margin: 0px auto;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2b61e1;
  margin-top: 5rem;
`;

const Text = styled.div`
  width: 37rem;
  font-family: "AppleSDGothicNeoR";
  font-size: 15px;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Tag = styled.div`
  width: 37rem;
  color: #2b61e1;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  width: 35rem;
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

const ButtonWrap = styled.div`
  width: 50rem;
  margin: 0px auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  color: #ffffff;
  font-size: 1rem;
  width: 20rem;
  height: 3rem;
  background-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid;
  border-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  border-radius: 5px;
`;

export default TrilsWrite;
