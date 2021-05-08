import React, { useRef, useState } from "react";
import styled from "styled-components";
// import "./test.css";
import ClearIcon from "@material-ui/icons/Clear";

const Test = () => {
  const tagInput = useRef(null);
  const [tags, setTags] = useState(["Tags", "Input"]);

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    console.log(newTags);
    setTags([...newTags]);
  };

  const InputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
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
    <InputTag className="input-tag">
      <InputTagTags className="input-tag__tags">
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
        <InputLi className="input-tag__tags__input">
          <Input type="text" onKeyDown={InputKeyDown} ref={tagInput} />
        </InputLi>
      </InputTagTags>
    </InputTag>
  );
};

const IconCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 1rem;
  }
`;

const InputTag = styled.div`
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px 0;
`;

const Input = styled.input`
  border: none;
  width: 100%;
`;

const InputTagTags = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Li = styled.li`
  align-items: center;
  background: #40C7C3;
  border-radius: 5px;
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 5px 10px;
`;

const InputLi = styled.li`
  align-items: center;
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 5px;
  margin-right: 5px;
  border: 0px;
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

const Liinput = styled.input`
  background: none;
  flex-grow: 1;
  padding: 0;
`;

export default Test;
