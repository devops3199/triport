import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";

const BoardComment = (props) => {

    const [showReply, setShowReply] = React.useState(false);
    const [showReplyInput, setShowReplyInput] = React.useState(false);

    const showReplyComment = () => {
        setShowReply(!showReply);
        console.log('대댓글 요청');
    };

    return(
        <>
            <CommentContainer>
                <ParentComment>
                    <UserContainer>
                        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
                        <span>홍길동</span>
                    </UserContainer>
                    <Content>
                        여행 정보 공유 너무 좋아요
                    </Content>
                </ParentComment>
                <Likes>
                    <LikeSpan>
                        <CommentLike />
                        <span>+3</span>
                    </LikeSpan>
                    <span onClick={() => setShowReplyInput(!showReplyInput)}>답글 작성</span>
                </Likes>
                <ReplyComment showReplyInput={showReplyInput}>
                    <input type="text" placeholder="답글 추가..." />
                </ReplyComment>
            </CommentContainer>
            <ShowComment>
                {showReply ? (<span onClick={showReplyComment}>댓글 감추기 ▲</span>) : (<span onClick={showReplyComment}>댓글 보기(2) ▼</span>)}
            </ShowComment>
            <ReplyContainer showReply={showReply}>
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
            </ReplyContainer>
        </>
    );
};

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

const ShowComment = styled.div`
    margin: .5rem 0;
    color: #2B61E1;

    & span {
        cursor: pointer;
        margin-left : 2.5rem;
    }
`;

const ReplyComment = styled.div`
    display: ${(props) => props.showReplyInput ? 'flex' : 'none'};
    align-items: center;
    margin : 1.5rem 0 1.5rem 2.5rem;

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
    display: ${(props) => props.showReply ? 'block' : 'none'};
    margin : 0 0 1.5rem 2.5rem;
`;

export default BoardComment;