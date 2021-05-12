import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { BoardChildComment } from "components/components";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';

const BoardComment = (props) => {
<<<<<<< HEAD
  const comment = React.useRef("");
  const [showReply, setShowReply] = React.useState(false);
  const [showReplyInput, setShowReplyInput] = React.useState(false);

  const showReplyComment = () => {
    setShowReply(!showReply);
    console.log("대댓글 요청");
  };

  const postChildComment = () => {
    console.log(comment.current.value, "대댓글 작성");
  };

  const hitLike = () => {
    console.log("댓글 좋아요");
  };

  return (
    <>
      <CommentContainer>
        <ParentComment>
          <UserContainer>
            <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
            <span>홍길동</span>
          </UserContainer>
          <Content>여행 정보 공유 너무 좋아요</Content>
        </ParentComment>
        <Likes>
          <LikeSpan>
            <div onClick={hitLike}>
              <CommentLike />
            </div>
            <span>+3</span>
          </LikeSpan>
          <span onClick={() => setShowReplyInput(!showReplyInput)}>
            답글 작성
          </span>
        </Likes>
        <ReplyComment showReplyInput={showReplyInput}>
          <input
            type="text"
            placeholder="답글 추가..."
            ref={comment}
            onKeyPress={(e) => {
              if (window.event.keyCode === 13) {
                postChildComment();
              }
            }}
          />
        </ReplyComment>
      </CommentContainer>
      <ShowComment>
        {showReply ? (
          <span onClick={showReplyComment}>댓글 감추기 ▲</span>
        ) : (
          <span onClick={showReplyComment}>댓글 보기(2) ▼</span>
        )}
      </ShowComment>
      <ReplyContainer showReply={showReply}>
        <BoardChildComment />
      </ReplyContainer>
    </>
  );
=======
    const dispatch = useDispatch();
    const child_comment = useSelector((state) => state.trilog.child_comment.list);
    const { id, comment } = props; // parent comment id
    const commentRef = React.useRef();
    const [showReply, setShowReply] = React.useState(false);
    const [showReplyInput, setShowReplyInput] = React.useState(false);

    const showReplyComment = () => {
        setShowReply(!showReply);
        
        if(!showReply) {
            // 자식 댓글 조회
            dispatch(TrilogActions.getChildComment(comment.commentParent.id));
        }
    };

    const postChildComment = () => {
        dispatch(TrilogActions.addChildComment(comment.commentParent.id, commentRef.current.value));
        document.getElementById('commentChildInput').value = ''; // 초기화
    }

    const hitLike = () => {
        const access_token = localStorage.getItem("access_token");
        const api = `http://13.209.8.146/api/boards/comments/parents/like/${comment.commentParent.id}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        }).then(res => res.json()).catch(err => console.log(err, 'comment like'));
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
            <ShowComment>
                {showReply ? (<span onClick={showReplyComment}>댓글 감추기 ▲</span>) : (<span onClick={showReplyComment}>댓글 보기(2) ▼</span>)}
            </ShowComment>
            <ReplyContainer showReply={showReply}>
                {child_comment.map((val, index) => {
                    console.log(val, 'val child');
                    return(
                        <BoardChildComment key={index} comment={val} id={comment.commentParent.id} />
                    );
                })}
            </ReplyContainer>          
        </>
    );
>>>>>>> chanyeop
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
