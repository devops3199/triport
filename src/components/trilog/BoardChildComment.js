import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";

const BoardChildComment = (props) => {
    const { id, comment } = props; // parent comment id
    
    const hitLike = () => {
        const access_token = localStorage.getItem("access_token");
        const api = `http://13.209.8.146/api/boards/comments/children/like/${id}`;

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${access_token}`,
            },
        }).then(res => res.json()).catch(err => console.log(err, 'child comment like'));
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
