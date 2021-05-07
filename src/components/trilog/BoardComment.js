import React from "react";
import styled from "styled-components";

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
                    <span>👍+3</span>
                    <span onClick={() => setShowReplyInput(!showReplyInput)}>답글 작성</span>
                </Likes>
                <ReplyComment showReplyInput={showReplyInput}>
                    <UserContainer>
                        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
                        <span>홍길동</span>
                    </UserContainer>
                    <input type="text" placeholder="답글 추가..." />
                    <button>등록</button>
                </ReplyComment>
            </CommentContainer>
            <ShowComment>
                {showReply ? (<span onClick={showReplyComment}>답글 감추기</span>) : (<span onClick={showReplyComment}>답글 보기</span>)}
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
                        <span>👍+0</span>
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

    & img {
        width: 1.643rem;
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
    margin-left : 1.5rem;
    & span {
        cursor: pointer;
        margin-right : 1.5rem;
    }
`;

const ShowComment = styled.div`
    & span {
        cursor: pointer;
        margin-left : 1.5rem;
    }
`;

const ReplyComment = styled.div`
    display: ${(props) => props.showReplyInput ? 'flex' : 'none'};
    align-items: center;
    margin : 1.5rem 0 1.5rem 1.5rem;

    & input {
        outline: none;
        border: 0;
        border-bottom: 1px solid #ededed;
        padding: .25rem .5rem;
        box-sizing: border-box;
        width: 80%;
    }

    & button {
        border: 0;
        padding: .25rem .5rem;
        width: 10%;
    }
`;

const ReplyContainer = styled.div`
    display: ${(props) => props.showReply ? 'block' : 'none'};
    margin : 1.5rem 0 1.5rem 1.5rem;
`;

export default BoardComment;