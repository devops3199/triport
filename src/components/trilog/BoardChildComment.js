import React from 'react';
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";

const BoardChildComment = (props) => {
    return(
        <div>
            <ChildComment>
                <UserContainer>
                    <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
                    <span>홍길동</span>
                </UserContainer>
                <Content>
                    대댓글이에요
                </Content>
            </ChildComment>
            <Likes>
                <LikeSpan>
                    <CommentLike />
                    <span>+3</span>
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
    font-family: AppleSDGothicNeoB;

    & img {
        width: 2.375rem;
        border-radius: 50%;
        margin-right: .5rem;
    }
`;

const Content = styled.div`

`;

const Likes = styled.div`
    margin: .5rem 0 .5rem 2.5rem;
    display: flex;
    align-items: center;

    & span {
        cursor: pointer;
        margin-right : 1.5rem;
    }
`;

const LikeSpan = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;

    & svg {
        width: 1.5rem;
        margin-right: .5rem;
    }
`;