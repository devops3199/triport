import React, { useRef, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch } from "react-redux";
import { TrilsActions } from "redux/modules/trils";
import afterImg from "../media/image/afterupload.png";
import { config } from "redux/modules/config";
import { logOut } from "redux/modules/user";

const TrilsWrite = (props) => {
  const { history } = props;
  const tagInput = useRef(null);
  const fileInput = useRef();
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const [vid, setVid] = useState(null);
  const [tagType, setTagType] = useState("");
  const [lock, setLock] = useState(false);

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
    setLock(true);
    if (vid === undefined || vid == null) {
      alert("영상을 업로드해주세요");
      setLock(false);
      return;
    }
    if (tags.length === 0) {
      alert("태그를 1개 이상 작성해주세요");
      setLock(false);
      return;
    }
    const access_token = localStorage.getItem("access_token");
    let formData = new FormData();
    formData.append("file", vid);
    tags.map((p, idx) => formData.append("hashtag", p));
    const api = `${config}/api/posts`;
    const data = {
      method: "POST",
      headers: {
        Authorization: `${access_token}`,
      },
      body: formData,
    };
    fetch(api, data)
      .then((result) => {
        if (result.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("userInfo");
          dispatch(logOut());
          alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
          history.push("/login");
        }
        return result.json();
      })
      .then((result) => {
        if (result.ok) {
          alert("정상적으로 작성되었습니다.");
          history.replace("/");
          setLock(false);
        } else {
          alert(result.msg);
          setLock(false);
        }
      })
      .catch((err) => {
        setLock(false);
        alert("업로드 중 에러가 발생했습니다.", err);
      });
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

  const change = (e) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substr(0, 10);
    }
    const curValue = e.target.value;
    // const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
    const regExp = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"\s]/gi;
    const newValue = curValue.replace(regExp, "");
    setTagType(newValue);
  };

  const cancel = () => {
    history.goBack(0);
  };

  return (
    <React.Fragment>
      <Wrap>
        <VideoView onClick={triggerVideo}>
          {!(vid === null) ? (
            <Uploading src={afterImg} />
          ) : (
            <>
              <div style={{ fontSize: "25px", userSelect: "none" }}>
                영상을 업로드해주세요.(클릭)
              </div>
              <div style={{ fontSize: "15px", userSelect: "none" }}>
                영상 길이 10초 이하, 크기 50MB 이하
              </div>
            </>
          )}
          <input
            type="file"
            accept="video/*"
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
        <Button id="write" onClick={post} disabled={lock}>
          작성완료
        </Button>
        <Button id="cancel" onClick={cancel} disabled={lock}>
          취소
        </Button>
      </ButtonWrap>
    </React.Fragment>
  );
};

const Uploading = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background-image: url("${(props) => props.src}");
  background-color: #ededed;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
  user-select: none;
  width: 37rem;
  height: auto;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px auto;
  padding: 5px;
  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
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
  margin-top: 1rem;
  @media only screen and (max-width: 630px) {
    width: calc(100% - 20px);
    height: 20rem;
  }
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
  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
`;

const Tag = styled.div`
  user-select: none;
  width: 37rem;
  color: #2b61e1;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
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
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  width: 40rem;
  margin: 0px auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 860px) {
    flex-direction: column;
    margin-top: 1rem;
    width: 100%;
  }
`;

const Button = styled.button`
  user-select: none;
  cursor: pointer;
  font-family: "paybooc-Bold";
  color: #ffffff;
  font-size: 1rem;
  width: 15rem;
  height: 3rem;
  background-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid;
  border-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  border-radius: 5px;
  @media only screen and (max-width: 860px) {
    margin: 5px auto;
  }
`;

export default TrilsWrite;
