import React from "react";
import styled from "styled-components";

import blankcheck from "media/image/blank_check.png";
import question from "media/image/question_mark.png";
import check from "media/image/check.png";

const Role = () => {
  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const GetClick = (e) => {
    setCurrentClick(e.target.id); // 해당 엘리먼트의 id값
  };

  React.useEffect((e) => {
    if (currentClick !== null) {
      let current = document.getElementById(currentClick);
      let current1 = document.getElementById(currentClick + "1");
      // console.log(current1);
      current1.style.color = "#2B61E1";
    }
  });

  // console.log(document.getElementById("editor"));
  // console.log(document.getElementById("editor1"));

  return (
    <React.Fragment>
      <Wrap>
        <SmallWrap>
          <CheckWhether id="editor" onClick={GetClick} />
          <div id="editor1">트레블 에디터</div>
          <Question />
        </SmallWrap>

        <SmallWrap>
          <CheckWhether id="user" onClick={GetClick} />
          <div id="user1">트레블러</div>
          <Question />
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

export default Role;

const Wrap = styled.div`
  width: 23rem;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px auto;
  margin-bottom: 1rem;
`;

const SmallWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CheckWhether = styled.div`
  cursor: pointer;
  width: 1.3rem;
  height: 1.3rem;
  background-image: url("${check}");
  background-size: 1.3rem 1.3rem;
  margin-right: 0.5rem;
`;

const Question = styled.div`
  cursor: pointer;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("${question}");
  background-size: 0.8rem 0.8rem;
  margin: 0px auto;
  margin-left: 1rem;
`;

const Text = styled.div`
  color: #535353;
`;
