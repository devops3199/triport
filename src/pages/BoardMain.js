import React from "react";
import styled from "styled-components";
import { history } from 'redux/configureStore';
import { Plus } from "media/svg/Svg";
import { BoardCard } from 'components/components';

const BoardMain = (props) => {

    const tabToggle = () => {
        const tab = document.getElementById('FilterTab');
        const like = document.getElementById('LikeText');
        const newest = document.getElementById('NewestText');

        if(tab.style.left !== '50%') {
            tab.style.left = '50%';
            like.style.color = '#89ACFF';
            newest.style.color = '#fff';
        } else {
            tab.style.left = '0%';
            like.style.color = '#fff';
            newest.style.color = '#89ACFF';
        }
    };

    return (
        <BoardMainContainer>
            <FloatingButton onClick={() => {
                history.push("/board/write");
            }}>
                <Plus />
            </FloatingButton>
            <SearchContainer>
                <Search type="text" placeholder="검색어를 입력하세요." />
            </SearchContainer>
            <FilterContainer>
                <Filter>
                    <Background id="FilterTab" />
                    <LikeFilter onClick={tabToggle}>
                        <span id="LikeText">좋아요순</span>
                    </LikeFilter>
                    <NewestFilter onClick={tabToggle}>
                        <span id="NewestText">최신순</span>
                    </NewestFilter>
                </Filter>
            </FilterContainer>
            <CardContainer>
                <BoardCard margin='0 40px 0 0' />
                <BoardCard margin='0 40px 0 0' />
                <BoardCard margin='0 40px 0 0' />
                <BoardCard margin='0 40px 0 0' />
                <BoardCard />

                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard />

                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard />

                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard />

                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard margin='50px 40px 0 0' />
                <BoardCard />
            </CardContainer>
        </BoardMainContainer>
    );
};

const BoardMainContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    position: relative;
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 50px;
`;

const Search = styled.input`
    width: 100%;
    border: 1px solid rgb(43, 97, 225, .6);
    border-radius: 5px;
    outline: none;
    padding: .75rem 1.25rem;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 50px;
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

<<<<<<< HEAD
const LikeFilter = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & span {
        font-family: 'TTTogether';
        font-size: 14px;
        letter-spacing: 0px;
        color: #fff;
        z-index: 10;
        transition: color .3s;
    }
`;

const NewestFilter = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & span {
        font-family: 'TTTogether';
        font-size: 14px;
        letter-spacing: 0px;
        color: #89ACFF;
        z-index: 10;
        transition: color .3s;
    }
`;

const Filter = styled.div`
    position: relative;
    width: 14.125rem;
    height: 2.5rem;
    background: #F4F4F4 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    display: flex;
=======
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
>>>>>>> minkyung
`;

const CardContainer = styled.div`
  width: 100%;
`;

<<<<<<< HEAD
const FloatingButton = styled.div`
    position: fixed;
    bottom: 5%;
    right: 3%;
    width: 3.125rem;
    height 3.125rem;
    cursor: pointer;
    z-index: 9999;

    & svg {
        width: 100%;
        height: 100%;
        fill: #2B61E1;
    }
`;

export default BoardMain;
=======
export default BoardMain;
>>>>>>> minkyung
