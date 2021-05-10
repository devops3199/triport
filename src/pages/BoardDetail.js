import React from "react";
import styled from "styled-components";
import { BoardView, BoardComment, BoardDetailMap } from "components/components";
import { LikeFill, LikeEmpty } from "media/svg/Svg";

const BoardDetail = (props) => {

    React.useEffect(() => {
        console.log("detail api");
    }, []);

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
                    <LikeFill/>
                    <div>
                        <span>좋아요+</span>
                        <LikeCount>0</LikeCount>
                    </div>
                    <div>
                        <span>댓글+</span>
                        <CommentCount>0</CommentCount>
                    </div>
                </Infomation>
                <CommentInput>
                    <input type="text" placeholder="댓글을 입력하세요." />
                </CommentInput>
                <Separator />
                <BoardComment />
            </LikeCommentContainer>
        </DetailContainer>
    );
};

const Separator = styled.hr`
    color: #89ACFF;
    opacity: .5;
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
    font-family: AppleSDGothicNeoB;

    & img {
        width: 2.375rem;
        border-radius: 50%;
        margin-right: .5rem;
    }
`;

const LikeCount = styled.span`
    margin-right: .5rem;
`;

const CommentCount = styled.span`

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
    font-family: AppleSDGothicNeoR;

    & svg {
        cursor: pointer;
        width: 3.2rem;
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
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        border: 1px solid #707070;
        border-radius: 5px;
        padding: 0 1rem;
    }
`;

export default BoardDetail;