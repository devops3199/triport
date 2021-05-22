import Video from "components/trils/Video";
import React, { useEffect, useRef, useState, Fragment } from "react";
import { history } from "redux/configureStore";
import { Plus, Arrow } from "media/svg/Svg";
import styled, { keyframes } from "styled-components";
import TrilsDetail from "../components/trils/TrilsDetail";
import { TrilsActions } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";
import InfinityScroll from "shared/InfinityScroll";
import SearchIcon from "@material-ui/icons/Search";
import Swal from "sweetalert2";
import queryString from "query-string";
import Fade from "react-reveal/Fade";

const Trils = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.trils.data);
  const modal = useSelector((state) => state.trils.modal);
  const is_last = useSelector((state) => state.trils.is_last);
  const [filter, _setFilter] = useState(true);
  const filterRef = useRef(filter);
  const [keyword, setKeyword] = useState("");

  const { search } = props.location;
  const queryObj = queryString.parse(search);

  /* 필터 기능 - 좋아요순 최신순 */
  const tabToggle = () => {
    const tab = document.getElementById("FilterTab");
    const like = document.getElementById("LikeText");
    const newest = document.getElementById("NewestText");

    const setFilter = (data) => {
      filterRef.current = data;
      _setFilter(data);
    };

    if (tab.style.left !== "50%") {
      tab.style.left = "50%";
      like.style.color = "#89ACFF";
      newest.style.color = "#fff";
    } else {
      tab.style.left = "0%";
      like.style.color = "#fff";
      newest.style.color = "#89ACFF";
    }

    if (filter) {
      // 최신순
      dispatch(TrilsActions.filterPost(queryObj.q, "createdAt"));
    } else {
      // 좋아요순
      dispatch(TrilsActions.filterPost(queryObj.q, "likeNum"));
    }
    setFilter(!filter);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!(queryObj.filter === "createdAt" || queryObj.filter === "likeNum")) {
      history.push("/notFound");
    }
    dispatch(TrilsActions.searchPost(queryObj.q, queryObj.filter, 1));
  }, [dispatch, queryObj.q, queryObj.filter]);

  const scroll = () => {
    const filter_scroll = filterRef.current;
    if (filter_scroll) {
      // 좋아요순
      dispatch(TrilsActions.getPost(queryObj.q, "likeNum"));
    } else {
      // 최신순
      dispatch(TrilsActions.getPost(queryObj.q, "createdAt"));
    }
  };

  const searching = (e) => {
    if (window.event.keyCode === 13) {
      // 좋아요순
      history.push(`/search?q=${keyword}&filter=likeNum`);
    }
  };

  const searchClick = (e) => {
    history.push(`/search?q=${keyword}&filter=likeNum`);
  };

  const top = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const write = () => {
    if (!is_login) {
      Swal.fire({
        title: "로그인을 해주세요.",
        text: "로그인 후 글작성이 가능합니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "로그인하기",
        cancelButtonText: "닫기",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    } else {
      history.push("/trils/write");
    }
  };

  return (
    <Container>
      <SearchContainer>
        <FloatingBox>
          <FloatingGoTop onClick={top}>
            <Arrow />
          </FloatingGoTop>
          <FloatingWrite onClick={write}>
            <Plus />
          </FloatingWrite>
        </FloatingBox>
        <SearchWrapper>
          <Search
            type="text"
            placeholder="검색어를 입력하세요."
            onKeyPress={searching}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <SearchIcon onClick={searchClick} />
        </SearchWrapper>
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
      {modal ? <TrilsDetail history={history} /> : null}
      <PostLine>
        {!post_list || post_list.length === 0 ? (
          <></>
        ) : (
          <InfinityScroll callNext={scroll} is_next={is_last}>
            {post_list.map((p, idx) => {
              return (
                <Fragment key={idx}>
                  <Fade bottom>
                    <Video {...p} history={history} />
                  </Fade>
                </Fragment>
              );
            })}
          </InfinityScroll>
        )}
      </PostLine>
    </Container>
  );
};

const Opacity = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CloseTutorial = styled.div`
  animation: ${Opacity} 1s;
  font-family: "paybooc-Bold";
  color: white;
  right: 50%;
  user-select: none;
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
  @media only screen and (max-width: 870px) {
    display: none;
  }
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
  @media only screen and (max-width: 720px) {
    width: 80%;
  }

  & svg {
    fill: rgb(43, 97, 225);
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80rem;
  @media only screen and (max-width: 1280px) {
    width: 850px;
  }
  @media only screen and (max-width: 870px) {
    width: 410px;
  }
  @media only screen and (max-width: 420px) {
    width: calc(100% - 20px);
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
    color: #89acff;
    z-index: 10;
    transition: color 0.3s;
  }
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
    color: #fff;
    z-index: 10;
    transition: color 0.3s;
  }
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

const Filter = styled.div`
  position: relative;
  width: 14.125rem;
  height: 2.5rem;
  background: #f4f4f4 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
  @media only screen and (min-width: 425px) and (max-width: 1280px) {
    margin-right: 1rem;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 4rem;
  @media only screen and (max-width: 870px) {
    margin-bottom: 1rem;
    justify-content: center;
  }
`;

// const Search = styled.input`
//   width: 40.625rem;
//   border: 1px solid rgb(43, 97, 225, 0.6);
//   border-radius: 5px;
//   outline: none;
//   padding: 0.75rem 1.25rem;
// `;

const Search = styled.input`
  border: none;
  outline: none;
  width: 38rem;
  @media only screen and (max-width: 870px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  @media only screen and (max-width: 540px) {
    margin-bottom: 1rem;
  }
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 80rem;
`;

const PostLine = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${(props) => (props.tutorial ? `1fr` : `1fr 1fr 1fr`)};
  /* grid-template-rows: repeat(auto-fit, 45rem); */
  /* row-gap: 2rem; */
  justify-items: center;
  max-width: 80rem;
  margin: 0px auto;
  margin-bottom: 4.3rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 1280px) {
    grid-template-columns: ${(props) => (props.tutorial ? `1fr` : `1fr 1fr`)};
  }
  @media only screen and (max-width: 870px) {
    grid-template-columns: 1fr;
  }
`;

const FloatingBox = styled.div`
  position: fixed;
  bottom: 6%;
  right: 3%;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media only screen and (max-width: 425px) {
    bottom: 8%;
    right: 6%;
  }
`;

const FloatingTutorial = styled.div`
  width: ${(props) => (props.tutorial ? "10rem" : "3.125rem")};
  height: 3.125rem;
  cursor: pointer;
  z-index: 50;
  background: linear-gradient(to bottom right, #52a0fd, #00e2fa);
  /* background-color: #2b61e1; */
  border-radius: 25px;
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
  & svg {
    width: 60%;
    height: 60%;
    fill: #ffffff;
    animation: ${Opacity} 1s;
  }
  margin-bottom: 0.5rem;
`;

const FloatingGoTop = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 50;
  background-color: #2b61e1;
  border-radius: 25px;
  transform: rotate(-90deg);
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    width: 60%;
    height: 60%;
    fill: #ffffff;
  }
  margin-bottom: 0.5rem;
`;

const FloatingWrite = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 50;
  & svg {
    width: 100%;
    height: 100%;
    fill: #2b61e1;
  }
`;

export default Trils;
