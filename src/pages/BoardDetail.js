import React from "react";
import styled from "styled-components";
import { BoardView, BoardComment, BoardDetailMap } from "components/components";
import { LikeFill, LikeEmpty } from "media/svg/Svg";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';
import { history } from "redux/configureStore";

const BoardDetail = (props) => {
    const id = props.match.params.id;
    const dispatch = useDispatch();

    const is_login = useSelector((state) => state.user.is_login);
    const detail = useSelector((state) => state.trilog.detail);
    const is_loading = useSelector((state) => state.trilog.loading.detail_loading);
    const comment = useSelector((state) => state.trilog.parent_comment.list);
    const is_last = useSelector((state) => state.trilog.parent_comment.is_last);

    const commentRef = React.useRef('');

    React.useEffect(() => {
        dispatch(TrilogActions.getTrilogDetail(id));
    }, []);

    const postParentComment = () => {
        if(!is_login) {
            alert("로그인을 먼저 하세요!");
            return;
        }
        dispatch(TrilogActions.addParentComment(id, commentRef.current.value));
        document.getElementById('commentInput').value = ''; // 초기화
    };

    const hitLike = () => {
        if(!is_login) {
            alert("로그인을 먼저 하세요!");
            return;
        }
        dispatch(TrilogActions.setLikeTrilogDetail(id));
    };

    const getMorecomment = () => {
        dispatch(TrilogActions.getParentCommentScroll(id));
    };

    const editTrilog = () => {
        history.replace(`/trilog/write/${id}`);
    };

    const deleteTrilog = () => {
        if(window.confirm('해당 게시글을 삭제하시겠습니까?')){
            dispatch(TrilogActions.removeTrilog(id));
        }
    };

    return (
      <DetailContainer>
        {is_loading ? (
          <></>
        ) : (
          <>
            <UserContainer>
              <div>
                <img src={detail.author.profileImgUrl} />
                <span>{detail.author.nickname}</span>
              </div>
              <div>
                마지막 수정시간 : {detail.information.modifiedAt}
                {detail.member.isMembers ? (
                  <>
                    <EditButton type="button" value="수정" onClick={editTrilog} />
                    <DeleteButton type="button" value="삭제" onClick={deleteTrilog} />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </UserContainer>
            <Separator />
            <ToastViewContainer>
              {detail.information.description === "" ? (
                <></>
              ) : (
                <BoardView content={detail.information.description} />
              )}
            </ToastViewContainer>
            <MapConatiner>
              {detail.information.address === '지도 마커를 클릭하시면 주소가 여기 표시됩니다.' ? (<></>) : (<BoardDetailMap address={detail.information.address} />) }
            </MapConatiner>
            <Separator />
            <LikeCommentContainer>
              <Infomation>
                <span onClick={hitLike}>
                  {detail.member.isLike ? <LikeFill /> : <LikeEmpty />}
                </span>
                <div>
                  <span>좋아요+</span>
                  <LikeCount>{detail.information.likeNum}</LikeCount>
                </div>
                <div>
                  <span>댓글+</span>
                  <CommentCount>{detail.information.commentNum}</CommentCount>
                </div>
              </Infomation>
              <CommentInput>
                <input
                  id="commentInput"
                  type="text"
                  placeholder="댓글을 입력하세요."
                  ref={commentRef}
                  onKeyPress={(e) => {
                    if (window.event.keyCode === 13) {
                      postParentComment();
                    }
                  }}
                />
              </CommentInput>
              <Separator />
              {comment.map((val, index) => {
                return <BoardComment id={id} comment={val} key={index} />;
              })}
            </LikeCommentContainer>
            {is_last ? (
              <></>
            ) : (
              <ShowMoreComment>
                <span onClick={getMorecomment}>댓글 더 보기</span>
              </ShowMoreComment>
            )}
          </>
        )}
      </DetailContainer>
    );
};

const Separator = styled.hr`
  color: #89acff;
  opacity: 0.5;
  margin: 0.75rem 0;
`;

const DetailContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  position: relative;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-family: AppleSDGothicNeoB;

    & img {
        width: 2.375rem;
        border-radius: 50%;
        margin-right: .5rem;
    }

    & div {
        display: flex;
        align-items: center;
    }
`;

const LikeCount = styled.span`
  margin-right: 0.5rem;
`;

const CommentCount = styled.span``;

const ToastViewContainer = styled.div``;

const MapConatiner = styled.div``;

const LikeCommentContainer = styled.div`
  width: 100%;
`;

const Infomation = styled.div`
  display: flex;
  align-items: center;
  font-family: "AppleSDGothicNeoR";

  & svg {
    cursor: pointer;
    width: 3.2rem;
  }
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;

  & input {
    outline: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border: 1px solid rgb(43,97,225,0.6);
    border-radius: 5px;
    padding: 0 1rem;
  }
`;

const ShowMoreComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 1.5rem 0;
  & span {
      cursor: pointer;
  }
`;

const EditButton = styled.input`
    cursor: pointer;
    background-color: #2b61e1;
    color: #fff;
    border: 1px solid #2b61e1;
    border-radius: 5px;
    padding: .25rem .75rem;
    margin: 0 .5rem;
`;

const DeleteButton = styled.input`
    cursor: pointer;
    background-color: #f22d3f;
    border: 1px solid #f22d3f;
    color: #fff;
    border-radius: 5px;
    padding: .25rem .75rem;
`;

export default BoardDetail;
