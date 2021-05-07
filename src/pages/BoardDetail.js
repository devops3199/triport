import React from "react";
import styled from "styled-components";
import { BoardView, BoardComment, BoardDetailMap } from "components/components";
import { LikeFill, LikeEmpty } from "media/svg/Svg";

const BoardDetail = (props) => {
    return(
        <DetailContainer>
            <UserContainer>
                <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
                <span>홍길동</span>
            </UserContainer>
            <Separator/>
            <ToastViewContainer>
                <BoardView />
            </ToastViewContainer>
            <MapConatiner>
                <BoardDetailMap address="서울 관악구 봉천동 1572-15" />
            </MapConatiner>
            <Separator/>
            <LikeCommentContainer>
                <Infomation>
                    <LikeEmpty/>
                    <div>
                        <span>좋아요</span>
                        <span>0</span>
                    </div>
                    <div>
                        <span>댓글</span>
                        <span>0</span>
                    </div>
                </Infomation>
                <CommentInput>
                    <UserContainer>
                        <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/130-512.png" />
                        <span>홍길동</span>
                    </UserContainer>
                    <input type="text" placeholder="댓글을 입력하세요." />
                    <button>작성</button>
                </CommentInput>
                <Separator />
                <BoardComment />
            </LikeCommentContainer>
        </DetailContainer>
    );
};

const Separator = styled.hr`
    color: #2b61e1;
    opacity: .1;
    margin: .75rem 0;
`;

const DetailContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    position: relative;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    width: 10%;

    & img {
        width: 1.643rem;
        border-radius: 50%;
        margin-right: .5rem;
    }
`;

const ToastViewContainer = styled.div`

`;

const MapConatiner = styled.div`

`;

const LikeCommentContainer = styled.div`
    width: 100%;
`;

const Infomation = styled.div`
    display: flex;
    align-items: center;

    & svg {
        cursor: pointer;
        width: 1.643rem;
    }
`;

const CommentInput = styled.div`
    display: flex;
    align-items: center;
    margin: .5rem 0;
    width: 100%;

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

export default BoardDetail;