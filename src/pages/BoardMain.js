import React from "react";
import styled from "styled-components";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import { BoardCard } from "components/components";
import InfinityScroll from "shared/InfinityScroll";

/* 데이터는 해당 컴포넌트에서만 사용하기 때문에 Redux를 사용안합니다. */
const BoardMain = (props) => {
  const [trilog, setTrilog] = React.useState([]);
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
      const api = "http://13.209.8.146/api/all/boards?page=1&filter=likeNum&keyword="
      fetch(api)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, "좋아요순 error"));
    } else {
      // 최신순
      const api = "http://13.209.8.146/api/all/boards?page=1&filter=modifiedAt&keyword="
      fetch(api)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, "날짜순 error"));
    }

    setFilter(!filter);
  };

  const scroll = () => {
    const filter_scroll = filterRef.current;
    const keyword_scroll = keyword.current.value;
    
    if(!filter_scroll) {
      // 좋아요순
      const api = `http://13.209.8.146/api/all/boards?page=1&filter=likeNum&keyword=${keyword_scroll}`
      fetch(api)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, "좋아요순 무한 스크롤 error"));
    } else {
      // 최신순
      const api = `http://13.209.8.146/api/all/boards?page=1&filter=modifiedAt&keyword=${keyword_scroll}`
      fetch(api)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err, "날짜순 무한 스크롤 error"));
    }

    const temp_arr = new Array(5).fill(0);
    setTrilog(prevState => ([...prevState, ...temp_arr]));
  };

  React.useEffect(() => {
    const temp_arr = new Array(15).fill(0);
    setTrilog([...trilog, ...temp_arr]);
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
                console.log('검색')
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
          is_next={false}
        >
          { trilog.map((val, idx) => {
              const index = idx + 1;

              if(index % 5 === 0) {
                return <BoardCard key={index} />;
              }

              return <BoardCard key={index} margin="50px 40px 0 0" />
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
