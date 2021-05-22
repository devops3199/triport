import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import { BoardCard } from "components/components";
import InfinityScroll from "shared/InfinityScroll";
import { actionCreators as TrilogActions } from "redux/modules/trilog";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import Tripper from "media/image/triport_airplane.png";
import Fade from "react-reveal/Fade";

const BoardMain = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login); // 로그인 여부
  const trilog = useSelector((state) => state.trilog.main.list); // 게시글 정보
  const is_last = useSelector((state) => state.trilog.main.is_last); // 무한 스크롤 - 다음 게시글이 있나 여부
  const filter_type = useSelector((state) => state.trilog.main.filter); // 필터
  const filterRef = React.useRef(filter_type); // 필터 - 좋아요순, 최신순
  const keyword = React.useRef(); // 검색어

  /* 필터 기능 - 좋아요순 최신순 */
  const tabToggle = () => {
    const tab = document.getElementById("FilterTab");
    const like = document.getElementById("LikeText");
    const newest = document.getElementById("NewestText");

    if (filter_type === "createdAt") {
      // 좋아요순
      tab.style.left = "0%";
      like.style.color = "#fff";
      newest.style.color = "#89ACFF";
      dispatch(
        TrilogActions.getTrilogMainFilter("likeNum", keyword.current.value)
      );
    } else {
      // 최신순
      tab.style.left = "50%";
      like.style.color = "#89ACFF";
      newest.style.color = "#fff";
      dispatch(
        TrilogActions.getTrilogMainFilter("createdAt", keyword.current.value)
      );
    }

    filterRef.current = filter_type;
  };

  React.useEffect(() => {
    dispatch(TrilogActions.getTrilogMain("likeNum", ""));
  }, []);

  const scroll = () => {
    const filter_scroll = filterRef.current;

    if (filter_scroll === "likeNum") {
      // 좋아요순
      dispatch(TrilogActions.getTrilogMain("likeNum", ""));
    } else {
      // 최신순
      dispatch(TrilogActions.getTrilogMain("createdAt", ""));
    }
  };

  const searchTrilog = () => {
    dispatch(
      TrilogActions.getTrilogMainFilter(filter_type, keyword.current.value)
    );
  };

  return (
    <BoardMainContainer>
      {is_login ? (
        <FloatingButton
          onClick={() => {
            history.push("/trilog/write");
          }}
        >
          <Plus />
        </FloatingButton>
      ) : (
        <></>
      )}
      <SearchContainer>
        <SearchWrapper>
          <Search
            type="text"
            placeholder="검색어를 입력하세요."
            ref={keyword}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13) {
                searchTrilog();
              }
            }}
          />
          <SearchIcon onClick={searchTrilog} />
        </SearchWrapper>
      </SearchContainer>
      <FilterContainer>
        <Filter>
          <Background id="FilterTab" type={filter_type} />
          <LikeFilter onClick={tabToggle} type={filter_type}>
            <span id="LikeText">좋아요순</span>
          </LikeFilter>
          <NewestFilter onClick={tabToggle} type={filter_type}>
            <span id="NewestText">최신순</span>
          </NewestFilter>
        </Filter>
        <MoveTripper>
          <img src={Tripper} />
        </MoveTripper>
      </FilterContainer>
      <CardContainer>
        {trilog.length === 0 ? (
          <></>
        ) : (
          <>
            <InfinityScroll callNext={scroll} is_next={is_last}>
              {trilog.map((val, idx) => {
                return (
                  <Fade bottom key={idx}>
                    <BoardCard data={val} margin="50px 15px 0 15px" />
                  </Fade>
                );
              })}
            </InfinityScroll>
          </>
        )}
      </CardContainer>
    </BoardMainContainer>
  );
};

const BoardMainContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1270px) {
    width: 850px;
  }

  @media (max-width: 980px) {
    width: 700px;
  }

  @media (max-width: 768px) {
    width: 500px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const SearchWrapper = styled.div`
  width: 40.625rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 3px 6px #00000029;

  & svg {
    fill: rgb(43, 97, 225);
    cursor: pointer;
  }

  @media (max-width: 980px) {
    width: 490px;
  }

  @media (max-width: 768px) {
    width: 384px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Search = styled.input`
  border: none;
  outline: none;
  width: 38rem;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const Background = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: ${(props) => (props.type === "likeNum" ? "0;" : "50%;")};
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
    font-family: "paybooc-Bold";
    font-size: 14px;
    letter-spacing: 0px;
    color: ${(props) => (props.type === "likeNum" ? "#fff;" : "#89ACFF;")};
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
    font-family: "paybooc-Bold";
    font-size: 14px;
    letter-spacing: 0px;
    color: ${(props) => (props.type === "likeNum" ? "#89ACFF;" : "#fff;")};
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

  @media (max-width: 600px) {
    bottom: 10%;
    right: 3%;
  }
`;

const Move = keyframes`
  0% {
    transform : translateX(-1500%);
  }
  100% {
    transform : translateX(0%);
  }
`;

const MoveTripper = styled.div`
  animation: ${Move} 5s;
  margin: 0 1rem 0 0;
  & img {
    width: 4rem;
  }
`;

export default BoardMain;
