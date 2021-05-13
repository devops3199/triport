import Video from "components/trils/Video";
import React, { useEffect, useRef, useState } from "react";
import { history } from "redux/configureStore";
import { Plus } from "media/svg/Svg";
import styled from "styled-components";
import TrilsDetail from "../components/trils/TrilsDetail";
import { TrilsActions } from "redux/modules/trils";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "shared/Spinner2";
import Swal from "sweetalert2";
import SearchIcon from "@material-ui/icons/Search";
import queryString from "query-string";
import { all_list } from "redux/Mock/trils_all_list";
import InfinityScroll from "shared/InfinityScroll";

const Trils = (props) => {
  // const { search } = props.location;
  // const queryObj = queryString.parse(search);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.trils.page);
  const post_list = useSelector((state) => state.trils.data);
  // const post_list = all_list.results;
  // console.log(post_list)
  const modal = useSelector((state) => state.trils.modal);
  const is_last = useSelector((state) => state.trils.is_last);
  const [filter, _setFilter] = useState(true);
  const filterRef = useRef(filter);
  const keyword = useRef("");

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
      // 좋아요순
      dispatch(TrilsActions.getPost(keyword.current.value, "likeNum", 1));
    } else {
      // 최신순
      dispatch(TrilsActions.getPost(keyword.current.value, "createdAt", 1));
    }
    setFilter(!filter);
  };

  useEffect(() => {
    dispatch(TrilsActions.getPost());
  }, [dispatch]);

  const next = () => {
    const setFilter = (data) => {
      filterRef.current = data;
      _setFilter(data);
    };

    if (filter) {
      // 좋아요순
      dispatch(TrilsActions.getPost(keyword.current.value, "likeNum", page));
    } else {
      // 최신순
      dispatch(TrilsActions.getPost(keyword.current.value, "createdAt", page));
    }
    setFilter(!filter);
  };

  const search = (e) => {
    if (window.event.keyCode === 13) {
      // 좋아요순
      history.push(`/search?q=${keyword.current.value}&filter=likeNum`);
    }
  };

  const scroll = () => {
    const filter_scroll = filterRef.current;

    if (!filter_scroll) {
      // 좋아요순
      dispatch(TrilsActions.getPost(keyword.current.value, "likeNum", page));
    } else {
      // 최신순
      dispatch(TrilsActions.getPost(keyword.current.value, "createdAt", page));
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchWrapper>
          <Search
            type="text"
            placeholder="검색어를 입력하세요."
            ref={keyword}
            onKeyPress={search}
          />
          <SearchIcon onClick={search} />
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
      <CenterDiv>
        {modal ? <TrilsDetail history={history} /> : null}
        <FloatingButton
          onClick={() => {
            if (access_token === null) {
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
          }}
        >
          <Plus />
        </FloatingButton>
        <PostLine>
          {!post_list || post_list.length === 0 ? (
            <></>
          ) : (
            <InfinityScroll callNext={scroll} is_next={is_last}>
              {post_list.map((p, idx) => {
                if ((idx + 1) % 3 !== 0) {
                  return (
                    <>
                      <Video {...p} history={history} mr />
                    </>
                  );
                } else {
                  return (
                    <>
                      <Video {...p} history={history} />
                    </>
                  );
                }
              })}
            </InfinityScroll>
          )}
        </PostLine>
      </CenterDiv>
    </Container>
  );
};

const SearchWrapper = styled.div`
  width: 40.625rem;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  outline: none;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 4rem;
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
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 80rem;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 5%;
  right: 3%;
  width: 3.125rem;
  height: 3.125rem;
  cursor: pointer;
  z-index: 9999;

  & svg {
    width: 100%;
    height: 100%;
    fill: #2b61e1;
  }
`;

const PostLine = styled.div`
  display: flex;
  width: 1280px;
  margin: 0px auto;
  margin-bottom: 4.3rem;
  flex-wrap: wrap;
`;

export default Trils;
