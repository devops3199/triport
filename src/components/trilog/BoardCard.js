import React from "react";
import styled from "styled-components";
import BgImg from 'media/image/trilog_default.jpg';
import ProfileImg from 'media/image/triport_airplane.png';
import { LikeFill, LikeEmpty } from "media/svg/Svg";
import { history } from "redux/configureStore";

const BoardCard = (props) => {
    const { margin, id } = props;

    const hitLike = (e) => {
        e.stopPropagation(); // 이벤트 버블링
        
        const access_token = localStorage.getItem("access_token");
        
        const api = `http://13.209.8.146/api/boards/like/${id}`;
        fetch(api, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': `${access_token}`,
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err, 'Like'));
    }

    return(
        <BoardCardContainer margin={ margin } >
            <ImageContainer onClick={() => {history.push('/trilog/1')}}>
                <UserContainer>
                    <Profile>
                        <div></div>
                        <span>Triport</span>
                    </Profile>
                    <Likes onClick={hitLike}>
                        <LikeFill />
                    </Likes>
                </UserContainer>
            </ImageContainer>
            <ContentContainer>
                <Detail>
                    <span>2021년 04월 29일</span>
                    <span>13:00:45</span>
                </Detail>
                <Title onClick={() => {history.push('/trilog/1')}}>
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
    background: url(${BgImg}) no-repeat center;
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
        width: 2.375rem;
        height: 2.375rem;
        background: url(${ProfileImg}) no-repeat center;
        background-size: cover;
        border-radius: 50%;
    }
    & span {
        margin-left: 5px;
        font-size: 14px;
        color: #5A5A5A;
        font-weight: 600;
    }
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 2;
    & svg {
        width: 2.375rem;
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