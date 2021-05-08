import React, { useRef, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";

const SnsWrite = () => {
  const tagInput = useRef(null);
  const [tags, setTags] = useState([]);

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
      console.log(tags);
      tagInput.current.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <React.Fragment>
      <Wrap>
        <VideoView>
          <p style={{ fontSize: "25px" }}>영상을 올려주세요.</p>
          <p style={{ fontSize: "15px" }}>10MB 제한</p>
        </VideoView>
        <Text>#강릉 #여행 #맛집</Text>
        <Tag>태그 (최대 3개)</Tag>
        <InputTag>
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
          <Input
            type="text"
            onKeyDown={InputKeyDown}
            ref={tagInput}
            placeholder="# 자유롭게 적고 엔터를 눌러주세요."
          ></Input>
        </InputTag>
      </Wrap>
      <ButtonWrap>
        <Button ok>작성완료</Button>
        <Button>취소</Button>
      </ButtonWrap>
    </React.Fragment>
  );
};

export default SnsWrite;

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
  font-family: "TTTogether";
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoView = styled.div`
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
  font-family: "TTTogether";
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
