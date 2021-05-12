import React from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import { BoardCard } from "components/components";
import InfinityScroll from "shared/InfinityScroll";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';

const BoardMain = (props) => {
  const dispatch = useDispatch();
  const trilog = useSelector((state) => state.trilog.main.list);
  const is_last = useSelector((state) => state.trilog.main.is_last);
  const [filter, _setFilter] = React.useState(false);
  const filterRef = React.useRef(filter);
  const keyword = React.useRef();

  const setFilter = (data) => {
    filterRef.current = data;
    _setFilter(data);
  };

  /* 필터 기능 - 좋아요순 최신순 */
  const tabToggle = () => {
    const tab = document.getElementById("FilterTab");
    const like = document.getElementById("LikeText");
    const newest = document.getElementById("NewestText");

    if (tab.style.left !== "50%") {
      tab.style.left = "50%";
      like.style.color = "#89ACFF";
      newest.style.color = "#fff";
    } else {
      tab.style.left = "0%";
      like.style.color = "#fff";
      newest.style.color = "#89ACFF";
    }

    if(filter) {
      // 좋아요순
      dispatch(TrilogActions.getTrilogMainFilter('likeNum', keyword.current.value));
    } else {
      // 최신순
      dispatch(TrilogActions.getTrilogMainFilter('modifiedAt', keyword.current.value));
    }

    setFilter(!filter);
  };

  const scroll = () => {
    const filter_scroll = filterRef.current;
    
    if(!filter_scroll) {
      // 좋아요순
      dispatch(TrilogActions.getTrilogMain('likeNum', ''));
    } else {
      // 최신순
      dispatch(TrilogActions.getTrilogMain('modifiedAt', ''));
    }
  };

  React.useEffect(() => {
    dispatch(TrilogActions.getTrilogMain('likeNum', ''));
  }, []);

  return (
    <BoardMainContainer>
      <FloatingButton
        onClick={() => {
          history.push("/trilog/write");
        }}
      >
        <Plus />
      </FloatingButton>
      <SearchContainer>
        <Search type="text" placeholder="검색어를 입력하세요." ref={keyword} onKeyPress={(e) => {
            if(window.event.keyCode === 13) {
              dispatch(TrilogActions.getTrilogMainFilter(`${filter ? 'modifiedAt' : 'likeNum' }`, keyword.current.value));
            } 
        }} />
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
        <InfinityScroll
          callNext={scroll}
          is_next={is_last}
        >
          { trilog.map((val, idx) => {
              const index = idx + 1;

              if(index % 5 === 0) {
                return <BoardCard data={val} key={index} />;
              }

              return <BoardCard data={val} key={index} margin="50px 40px 0 0" />
            }) }
        </InfinityScroll>
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
  justify-content: center;
  margin-bottom: 50px;
`;

const Search = styled.input`
  width: 40.625rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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

const LikeFilter = styled.div`
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
    z-index: 10;
    transition: color 0.3s;
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
    font-family: "TTTogether";
    font-size: 14px;
    letter-spacing: 0px;
    color: #89acff;
    z-index: 10;
    transition: color 0.3s;
  }
`;

const Filter = styled.div`
  position: relative;
  width: 14.125rem;
  height: 2.5rem;
  background: #f4f4f4 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
`;

const CardContainer = styled.div`
  width: 100%;
  margin: 0 0 4.2rem 0;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 99;

  & svg {
    width: 100%;
    height: 100%;
    fill: #2b61e1;
  }
`;

export default BoardMain;
