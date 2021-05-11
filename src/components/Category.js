import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";

const Category = () => {
  const [currentClick, setCurrentClick] = React.useState(null);
  const [prevClick, setPrevClick] = React.useState(null);

  const GetClick = (e) => {
    setCurrentClick(e.target.id); // 해당 엘리먼트의 id값
    history.push(`/${e.target.id}`); // 클릭 시 페이지 이동
  };

  React.useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick); // getElementById : id값으로 엘리먼트 찾아옴.
        // console.log(current);
        current.style.opacity = "1"; // 찾아온 엘리먼트에 style 속성 먹이기
      }

      if (prevClick !== null) {
        // 직전에 클릭한 카테고리에 원래의 style 속성 먹이기
        let prev = document.getElementById(prevClick);
        prev.style.opacity = "0.7";
      }
      setPrevClick(currentClick); // 클릭한 id 값을 prevClick에 저장한다.
    },
    [currentClick]
  );

  return (
    <React.Fragment>
      <Category1 id="trils" onClick={GetClick}>
        Trils
      </Category1>
      <Category1 id="trilog" onClick={GetClick}>
        Trilog
      </Category1>
      <Category2 id="about" onClick={GetClick}>
        About
      </Category2>
    </React.Fragment>
  );
};

export default Category;

const Category1 = styled.a`
  cursor: pointer;
  color: #2b61e1;
  margin-right: 4rem;
  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;

const Category2 = styled.a`
  cursor: pointer;
  color: #2b61e1;
  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;
