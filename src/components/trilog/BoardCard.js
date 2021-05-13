import React from "react";
import styled from "styled-components";
import BgImg from 'media/image/trilog_default.jpg';
import ProfileImg from 'media/image/triport_airplane.png';
import { actionCreators as TrilogActions } from 'redux/modules/trilog';
import { useDispatch } from 'react-redux';
import { LikeFill, LikeEmpty } from "media/svg/Svg";
import { history } from "redux/configureStore";

const BoardCard = (props) => {
    const dispatch = useDispatch();
    const { margin, data } = props;
    const information = data.information;
    const author = data.author;
    const member = data.member;
    const id = information.id;

    const hitLike = (e) => {
        e.stopPropagation(); // 이벤트 버블링
        dispatch(TrilogActions.setLikeTrilog(id));
    }

    return(
        <BoardCardContainer margin={ margin } >
            <ImageContainer onClick={() => {history.push(`/trilog/${id}`)}} img={information.thumbNailUrl}>
                <UserContainer>
                    <Profile img={author.profileImgUrl}>
                        <div></div>
                        <span>{author.nickname}</span>
                    </Profile>
                    <Likes onClick={hitLike}>
                        { member.isLike ? <LikeFill /> : <LikeEmpty /> }
                    </Likes>
                </UserContainer>
            </ImageContainer>
            <ContentContainer>
                <Detail>
                    <span>{information.modifiedAt.split(' ')[0]}</span>
                    <span>{information.modifiedAt.split(' ')[1]}</span>
                </Detail>
                <Title onClick={() => {history.push(`/trilog/${id}`)}}>
                    <span>{information.title}</span>
                </Title>
                <Description>
                    {information.description}
                </Description>
            </ContentContainer>
        </BoardCardContainer>
    );
};

BoardCard.defaultProps = {
    margin: '',
    information : {
        address: '',
        description: '',
        id: 1,
        modifiedAt: '1990-01-01 12:00:00',
        title: '',
    },
    author: {
        nickname: 'Triport',
        profileImgUrl: ProfileImg,
    },
    member: {
        like: false,
    }
};

const BoardCardContainer = styled.div`
    display: inline-block;
    box-sizing: border-box;
    width: 14rem;
    height: 23.063rem;
    transition: all .2s ease-in-out;
    box-shadow: 0px 3px 6px #00000029;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};

    &:hover {
        transform: scale(1.1);
    }
`; 

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 14rem;
    background: url(${(props) => props.img === '' ? BgImg : props.img}) no-repeat center;
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
        background: url(${(props) => props.img}) no-repeat center;
        background-size: cover;
        border-radius: 50%;
    }
    & span {
        margin-left: 5px;
        font-size: 14px;
        color: #fff;
        text-shadow: -1px 0 black,0 1px black,1px 0 black,0 -1px black;
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
        font-family: AppleSDGothicNeoB;
        color : #2B61E1;
    }
`;

const Description = styled.div`
    box-sizing: content-box;
    text-align: center;
    position: relative;
    padding: 0 .5rem;
    overflow: hidden;
`;

export default BoardCard;