import React from "react";
import styled from "styled-components";
import { LikeFill, LikeEmpty } from "media/svg/Svg";

const BoardCard = (props) => {
    const { margin } = props;

    return(
        <BoardCardContainer margin={ margin } >
            <ImageContainer>
                <UserContainer>
                    <Profile>
                        <div></div>
                        <span>Triport</span>
                    </Profile>
                    <Likes>
                        <LikeFill />
                    </Likes>
                </UserContainer>
            </ImageContainer>
            <ContentContainer>
                <Detail>
                    <span>2021년 04월 29일</span>
                    <span>13:00:45</span>
                </Detail>
                <Title>
                    <span>에디터가 추천하는 관악 여행</span>
                </Title>
                <Description>
                    <span>맛집이 가득한 샤로수길을 소개합니다~</span>
                </Description>
            </ContentContainer>
        </BoardCardContainer>
    );
};

const BoardCardContainer = styled.div`
    display: inline-block;
    box-sizing: border-box;
    width: 14rem;
    height: 23.063rem;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
`; 

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 14rem;
    background: url('http://www.rvsfinance.nl/wp-content/uploads/2016/06/ef3-placeholder-image.jpg') no-repeat center;
    background-size: cover;
    cursor: pointer;
`;

const UserContainer = styled.div`
    position: absolute;
    bottom: 11.5px;
    width: 100%;
    height: 1.563rem;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    & div {
        width: 1.563rem;
        height: 1.563rem;
        background: url('https://microbiology.ucr.edu/sites/g/files/rcwecm2866/files/styles/form_preview/public/blank-profile-pic.png?itok=xMM7pLfb') no-repeat center;
        background-size: cover;
        border-radius: 50%;
    }
    & span {
        margin-left: 5px;
        font-size: 12px;
        color: #5A5A5A;
        font-weight: 600;
    }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 9999;
    & svg {
        width: 1.643rem;
    }
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 9.063rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #BCBCBC;
    border-radius: 5px;
    margin-top: 2px;
`;

const Detail = styled.div`
    box-sizing: content-box;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & span {
        font-size: 12px;
        color: #5A5A5A;
    }
`;

const Title = styled.div`
    box-sizing: content-box;
    text-align: center;
    cursor: pointer;
    & span {
        color : #2B61E1;
    }
`;

const Description = styled.div`
    box-sizing: content-box;
    padding: 10px 20px;
    text-align: center;
    & span {
        font-size: 12px;
        color: #5A5A5A;
    }
`;

export default BoardCard;