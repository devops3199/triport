import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { BoardChildComment } from "components/components";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';
import { config } from "redux/modules/config";

const BoardComment = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const child_comment = useSelector((state) => state.trilog.child_comment.list);
    const { id, comment } = props;
    const commentRef = React.useRef();
    const [showReply, setShowReply] = React.useState(false);
    const [showReplyInput, setShowReplyInput] = React.useState(false);
    const [test, setTest] = React.useState({
      results : [],
    });

    const showReplyComment = () => {
        setShowReply(!showReply);
        
        if(!showReply) {
            // 자식 댓글 조회
            //dispatch(TrilogActions.getChildComment(comment.commentParent.id));
            const access_token = localStorage.getItem("access_token");

            fetch(`${config}/api/all/boards/comments/children/${comment.commentParent.id}?page=1`, {
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${access_token}`,
                },
            })
            .then(res => res.json())
            .then(data => {
              setTest(data);
            })
            .catch(err => console.log(err, 'get child comment trilog'));
        }
    };

    const postChildComment = () => {
      if(!is_login) {
        alert("로그인을 먼저 하세요!");
        return;
      }
      //dispatch(TrilogActions.addChildComment(comment.commentParent.id, commentRef.current.value));
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
        setTest(prevState => [...prevState, data])
      })
      .catch(err => console.log(err, 'child comment post'));
      document.getElementById('commentChildInput').value = ''; // 초기화
    }

    const hitLike = () => {
      if(!is_login) {
        alert("로그인을 먼저 하세요!");
        return;
      }
      dispatch(TrilogActions.setParentCommentLike(comment.commentParent.id));
    };

    return(
        <>
            <CommentContainer>
                <ParentComment>
                    <UserContainer>
                        <img src={comment.author.profileImgUrl} />
                        <span>{comment.author.nickname}</span>
                    </UserContainer>
                    <Content>
                        {comment.commentParent.contents}
                    </Content>
                </ParentComment>
                <Likes>
                    <LikeSpan>
                        <div onClick={hitLike}>
                        <CommentLike /> 
                        </div>
                        <span>+{comment.commentParent.likeNum}</span>
                    </LikeSpan>
                    <span onClick={() => setShowReplyInput(!showReplyInput)}>답글 작성</span>
                    {comment.user.isMembers ? (<><span>수정</span><span>삭제</span></>) : (<></>)}
                </Likes>
                <ReplyComment showReplyInput={showReplyInput}>
                    <input id="commentChildInput" type="text" placeholder="답글 추가..." ref={commentRef} onKeyPress={(e) => {
                        if(window.event.keyCode === 13) {
                            postChildComment();
                        } 
                    }} />
                </ReplyComment>
            </CommentContainer>
              {
              comment.commentParent.commentChildNum === 0 ? 
                (<></>) : 
                (<ShowComment> 
                  {
                    showReply ? 
                    (<span onClick={showReplyComment}>댓글 감추기 ▲</span>) : 
                    (<span onClick={showReplyComment}>댓글 보기({comment.commentParent.commentChildNum}) ▼</span>)
                  }
                  </ShowComment>)
              }
            <ReplyContainer showReply={showReply}>
              {/* {child_comment.filter(el => el.parent_id === comment.commentParent.id).map((value) => {
                console.log(value.parent_id, comment.commentParent.id, '===?');
                value.list.map((val, index) => {
                  return (
                    <BoardChildComment key={index} comment={val} parent_id={comment.commentParent.id} />
                  );
                })
              })} */}
              {test.results.map((val , index) => {
                return (
                  <BoardChildComment key={index} comment={val} parent_id={comment.commentParent.id} />
                );
              })}
            </ReplyContainer>
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
  display: flex;
  align-items: center;
`;

const ChildComment = styled.div`
  display: flex;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
`;

const Content = styled.div``;

const Likes = styled.div`
  margin: 0.5rem 0 0.5rem 2.5rem;
  display: flex;
  align-items: center;

  & span {
    cursor: pointer;
    margin-right: 1.5rem;
  }
`;

const LikeSpan = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;

  & svg {
    width: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const ShowComment = styled.div`
  margin: 0.5rem 0;
  color: #2b61e1;

  & span {
    cursor: pointer;
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
    border: 1px solid #707070;
    border-radius: 5px;
    padding: 0 1rem;
  }
`;

const ReplyContainer = styled.div`
  display: ${(props) => (props.showReply ? "block" : "none")};
  margin: 0 0 1.5rem 2.5rem;
`;

export default BoardComment;
