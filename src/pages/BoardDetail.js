import React from "react";
import styled from "styled-components";
import ViewTest from "components/ViewTest";

const BoardDetail = (props) => {
    return(
        <DetailContainer>
            <div>
                <ViewTest />
            </div>
            <LikeCommentContainer>
                <div>
                    <span>좋아요</span>
                    <span>댓글</span>
                </div>
                <div>
                    <input type="text" placeholder="댓글을 입력하세요." />
                </div>
                <div>
                    댓글
                </div>
            </LikeCommentContainer>
        </DetailContainer>
    );
};

const DetailContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    position: relative;
`;

const LikeCommentContainer = styled.div`
    width: 100%;

`;

export default BoardDetail;