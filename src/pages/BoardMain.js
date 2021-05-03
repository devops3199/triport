import React from "react";
import styled from "styled-components";
import "shared/scss/BoardMain.scss";
import { BoardCard } from "components/components";

const BoardMain = (props) => {
  const tabToggle = (e) => {
    const tab = document.getElementById("BoardTab");
    const editor = document.getElementById("TravelEditorText");
    const traveler = document.getElementById("TravelerText");

    if (tab.style.left !== "50%") {
      tab.style.left = "50%";
      editor.style.color = "#89ACFF";
      traveler.style.color = "#fff";
    } else {
      tab.style.left = "0%";
      editor.style.color = "#fff";
      traveler.style.color = "#89ACFF";
    }
  };

  return (
    <BoardMainContainer>
      <FilterContainer>
        <Editor>
          <Background id="BoardTab" />
          <TravelEditor onClick={tabToggle} className="TravelEditor">
            <span className="TravelEditor" id="TravelEditorText">
              트레블 에디터
            </span>
          </TravelEditor>
          <Traveler onClick={tabToggle} className="Traveler">
            <span className="Traveler" id="TravelerText">
              트레블러
            </span>
          </Traveler>
        </Editor>
        <Filter className="BoardFilterContainer">
          <FilterSelect id="BoardFilter" className="BoardFilterSelect">
            <option value="likes" selected>
              좋아요순
            </option>
            <option value="newest">최신순</option>
          </FilterSelect>
        </Filter>
      </FilterContainer>
      <CardContainer>
        <BoardCard margin="0 40px 0 0" />
        <BoardCard margin="0 40px 0 0" />
        <BoardCard margin="0 40px 0 0" />
        <BoardCard margin="0 40px 0 0" />
        <BoardCard />

        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard />

        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard />

        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard />

        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard margin="50px 40px 0 0" />
        <BoardCard />
      </CardContainer>
    </BoardMainContainer>
  );
};

const BoardMainContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const Editor = styled.div`
  position: relative;
  width: 14.125rem;
  height: 2.5rem;
  background: #f4f4f4 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
`;

const Background = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  background: #2b61e1 0% 0% no-repeat padding-box;
  border-radius: 5px;
  transition: left 0.5s;
`;

const TravelEditor = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & span {
    font-family: "TTTogether";
    font-size: 14px;
    letter-spacing: 0px;
    color: #fff;
    z-index: 9999;
    transition: color 0.3s;
  }
`;

const Traveler = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & span {
    font-family: "TTTogether";
    font-size: 14px;
    letter-spacing: 0px;
    color: #89acff;
    z-index: 9999;
    transition: color 0.3s;
  }
`;

const Filter = styled.div`
  position: relative;
  width: 5rem;
  display: flex;
  align-items: center;
`;

const FilterSelect = styled.select`
  width: 5rem;
  height: 2.5rem;
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: "AppleSDGothicNeoR", sans-serif;
  font-size: 14px;
  color: #5a5a5a;
`;

const CardContainer = styled.div`
  width: 100%;
`;

export default BoardMain;
