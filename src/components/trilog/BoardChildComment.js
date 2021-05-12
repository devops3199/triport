import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch, useSelector } from 'react-redux';

const BoardChildComment = (props) => {
  const dispatch = useDispatch();
  const { parent_id, comment } = props; // parent comment id
  
  const hitLike = () => {
    dispatch(TrilogActions.setChildCommentLike(parent_id, comment.commentChild.id));
  };

  return(
      <div>
          <ChildComment>
              <UserContainer>
                  <img src={comment.author.profileImgUrl} />
                  <span>{comment.author.nickname}</span>
              </UserContainer>
              <Content>
                  {comment.commentChild.contents}
              </Content>
          </ChildComment>
          <Likes>
              <LikeSpan>
                  <div onClick={hitLike}>
                      <CommentLike />
                  </div>
                  <span>+{comment.commentChild.likeNum}</span>
              </LikeSpan>
          </Likes>
      </div>
  );
};

export default BoardChildComment;

const ChildComment = styled.div`
  display: flex;
  align-items: center;
`;

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
