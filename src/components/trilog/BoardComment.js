import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { history } from "redux/configureStore";
import { BoardChildComment } from "components/components";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';
import { config } from "redux/modules/config";
import Swal from "sweetalert2";

const BoardComment = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login); // 로그인 체크 여부

    const { comment } = props; // BoardDetail 컴포넌트로부터 받은 data

    const commentRef = React.useRef(); // 부모 댓글 추가 시 가져오는 내용

    const [showReply, setShowReply] = React.useState(false); // 대댓글(자식 댓글) 보여주기 토글
    const [showReplyInput, setShowReplyInput] = React.useState(false); // 답글 작성 토글
    const [data, setData] = React.useState([]); // 대댓글(자식 댓글) 정보
    const [edit, setEdit] = React.useState(false); // 부모 댓글 수정
    const [parentCommentEdit, setParentCommentEdit] = React.useState(''); // Edit일때만 사용
    const [page, setPage] = React.useState(1); // 부모 댓글 페이징
    const [last, setLast] = React.useState(true); // 부모 댓글 페이징 - 다음 댓글 있나 없나 여부

    const input_id = `commentChildInput${comment.commentParent.id}`;

    React.useEffect(() => {
      if(comment.commentParent !== undefined) {
        setParentCommentEdit(comment.commentParent.contents);
      }
    }, []);

    // 대댓글 조회 - 대댓글은 Redux에서 관리안함
    const showReplyComment = () => {
        setShowReply(!showReply);
        
        if(!showReply) {
            const access_token = localStorage.getItem("access_token");

            fetch(`${config}/api/all/boards/comments/children/${comment.commentParent.id}?page=${page}`, {
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
            })
            .then(res => res.json())
            .then(data => {
              setData(data.results);

              if(!data.last) {
                setPage(prevState => prevState + 1);
                setLast(data.last);
              }
            })
            .catch(err => console.log(err, 'get child comment trilog'));
        }
    };
    
    const postChildComment = () => {
      if(!is_login) {
          Swal.fire({
            title: "로그인",
            text: "로그인을 먼저 해주세요.",
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
        return;
      }

      const access_token = localStorage.getItem("access_token");

      fetch(`${config}/api/boards/comments/children/${comment.commentParent.id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${access_token}`,
          },
          body: JSON.stringify({
              contents: commentRef.current.value,
          })
      })
      .then(res => res.json())
      .then(data => {
        setData(prevState => [...prevState, data.results]);
        if(!showReply) {
          setShowReply(true);
        }
        document.getElementById(input_id).value = '';

        Swal.fire({
          title: data.msg,
          icon: "success",
      });
      })
      .catch(err => console.log(err, 'child comment post'));
    }

    const hitLike = () => {
      if(!is_login) {
        alert("로그인을 먼저 하세요!");
        return;
      }
      dispatch(TrilogActions.setParentCommentLike(comment.commentParent.id));
    };

    const getMorecomment = () => {
      const access_token = localStorage.getItem("access_token");

      fetch(`${config}/api/all/boards/comments/children/${comment.commentParent.id}?page=${page}`, {
          method : 'GET',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${access_token}`,
          },
      })
      .then(res => res.json())
      .then(data => {
        setData(prevState => [...prevState, ...data.results]);

        if(!data.last) {
          setPage(prevState => prevState + 1);
          setLast(data.last);
        } else {
          setPage(1);
          setLast(data.last);
        }
      })
      .catch(err => console.log(err, 'get child comment trilog'));
    };

    const showEdit = () => {
      setEdit(!edit);
    };

    const editComment = () => {
      setEdit(!edit);
      dispatch(TrilogActions.editParentComment(comment.commentParent.id, parentCommentEdit));
    };

    const deleteComment =() => {
      Swal.fire({
        title: '해당 댓글을 삭제하시겠습니까?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `삭제`,
        denyButtonText: `취소`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(TrilogActions.removeParentComment(comment.commentParent.id));
        }
      });
    };

    return (
      <>
        <CommentContainer>
          <ParentComment>
            <UserContainer>
              <img src={comment.author.profileImgUrl} />
              <span>{comment.author.nickname}</span>
            </UserContainer>
            <Content>
              {edit ? (
                <>
                  <EditInput
                    type="text"
                    value={parentCommentEdit}
                    onChange={(e) => setParentCommentEdit(e.target.value)}
                    onKeyPress={(e) => {
                      if (window.event.keyCode === 13) {
                        editComment();
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <div>{comment.commentParent.contents}</div>
                  <Date>{comment.commentParent.createdAt}</Date>
                </>
              )}
            </Content>
          </ParentComment>
          <Likes>
            <LikeSpan>
              <div onClick={hitLike}>
                <CommentLike />
              </div>
              <span>+{comment.commentParent.likeNum}</span>
            </LikeSpan>
            <AddComment onClick={() => setShowReplyInput(!showReplyInput)}>
              답글 작성
            </AddComment>
            {comment.user.isMembers ? (
              <>
                <EditButton
                  type="button"
                  value={edit ? "취소" : "수정"}
                  onClick={showEdit}
                />
                <DeleteButton
                  type="button"
                  value="삭제"
                  onClick={deleteComment}
                />
              </>
            ) : (
              <></>
            )}
          </Likes>
          <ReplyComment showReplyInput={showReplyInput}>
            <input
              id={input_id}
              type="text"
              placeholder="답글 추가..."
              ref={commentRef}
              onKeyPress={() => {
                if (window.event.keyCode === 13) {
                  postChildComment();
                }
              }}
            />
          </ReplyComment>
        </CommentContainer>
        {comment.commentParent.commentChildNum === 0 ? (
          <></>
        ) : (
          <ShowComment>
            {showReply ? (
              <span onClick={showReplyComment}>댓글 감추기 ▲</span>
            ) : (
              <span onClick={showReplyComment}>
                댓글 보기({comment.commentParent.commentChildNum}) ▼
              </span>
            )}
          </ShowComment>
        )}
        <ReplyContainer showReply={showReply}>
          {data.map((val, index) => {
            return (
              <BoardChildComment
                key={index}
                comment={val}
                parent_id={comment.commentParent.id}
                setData={setData}
              />
            );
          })}
        </ReplyContainer>
        <ShowMoreComment showReply={showReply} last={last}>
          <span onClick={getMorecomment}>└ 대댓글 더 보기</span>
        </ShowMoreComment>
      </>
    );
};

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-family: "AppleSDGothicNeoB";

  & img {
    width: 2.375rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const ParentComment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  position: absolute;
  right: 0;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const Likes = styled.div`
  margin: 0.5rem 0 0.5rem 2.5rem;
  display: flex;
  align-items: center;

  & span {
    width: 65px;
  }
`;

const LikeSpan = styled.span`
  display: flex;
  align-items: center;

  & svg {
    cursor: pointer;
    width: 1.2rem;
    margin-right: 0.5rem;
  }

  & span {
    font-size: 15px;
  }
`;

const ShowComment = styled.div`
  margin: 0.5rem 0;
  color: #2b61e1;

  & span {
    cursor: pointer;
    font-size: 15px;
    margin-left: 2.5rem;
  }
`;

const ReplyComment = styled.div`
  display: ${(props) => (props.showReplyInput ? "flex" : "none")};
  align-items: center;
  margin: 1.5rem 0 1.5rem 2.5rem;

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

const ReplyContainer = styled.div`
  display: ${(props) => (props.showReply ? "block" : "none")};
  margin: 0 0 1.5rem 2.5rem;
`;

const AddComment = styled.span`
  font-size: 13px;
`;

const EditButton = styled.input`
  cursor: pointer;
  background-color: #2b61e1;
  color: #fff;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: .1rem .5rem;
  margin: 0 .5rem;
  font-size: 11px;
`;

const DeleteButton = styled.input`
  cursor: pointer;
  background-color: #f22d3f;
  border: 1px solid #f22d3f;
  color: #fff;
  border-radius: 5px;
  padding: .1rem .5rem;
  font-size: 11px;
`;

const EditInput = styled.input`
  outline: none;
  border: 0;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: 1px solid rgb(43,97,225,0.6);
  border-radius: 5px;
  padding: 0 1rem;
`;

const ShowMoreComment = styled.div`
  width: 100%;
  display: ${(props) => (!props.last ? "flex" : "none")};
  margin: 0 0 1.5rem 2.5rem;

  & span {
      cursor: pointer;
  }
`;

export default BoardComment;
