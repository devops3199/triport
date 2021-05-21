import React from "react";
import styled from "styled-components";
import BgImg from "media/image/trilog_default.jpg";
import ProfileImg from "media/image/triport_airplane.png";
import { actionCreators as TrilogActions } from "redux/modules/trilog";
import { useDispatch } from "react-redux";
import { LikeFill, LikeEmpty } from "media/svg/Svg";
import { history } from "redux/configureStore";

const BoardCard = (props) => {
  const dispatch = useDispatch();
  const { margin, data } = props; // data = 게시글 객체
  const information = data.information; // 게시글 정보
  const author = data.author; // 글쓴이 정보
  const member = data.member; // 로그인한 유저
  const id = information.id; // 게시글 ID

  const hitLike = (e) => {
    e.stopPropagation(); // 이벤트 버블링
    dispatch(TrilogActions.setLikeTrilog(id));
  };

  return (
    <BoardCardContainer margin={margin}>
      <ImageContainer
        onClick={() => {
          history.push(`/trilog/${id}`);
        }}
        img={information.thumbNailUrl}
      ></ImageContainer>
      <ContentContainer>
        <Title
          onClick={() => {
            history.push(`/trilog/${id}`);
          }}
        >
          <span>{information.title}</span>
        </Title>
        <UserContainer>
          <Profile img={author.profileImgUrl}>
            <div></div>
            <span>{author.nickname}</span>
          </Profile>
          <Likes onClick={hitLike}>
            {member.isLike ? <LikeFill /> : <LikeEmpty />}
            <span>+{information.likeNum}</span>
          </Likes>
        </UserContainer>
        <Detail>
          <span>{information.modifiedAt.split(" ")[0]}</span>
          <span>{information.modifiedAt.split(" ")[1]}</span>
        </Detail>
      </ContentContainer>
    </BoardCardContainer>
  );
};

BoardCard.defaultProps = {
  margin: "",
  information: {
    address: "",
    description: "",
    id: 1,
    modifiedAt: "1990-01-01 12:00:00",
    title: "",
  },
  author: {
    nickname: "Triport",
    profileImgUrl: ProfileImg,
  },
  member: {
    like: false,
  },
};

const BoardCardContainer = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 14rem;
  height: 23.063rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 3px 6px #00000029;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};

  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 14rem;
  background: url(${(props) => (props.img === "" ? BgImg : props.img)})
    no-repeat center;
  background-size: cover;
  cursor: pointer;
`;

const UserContainer = styled.div`
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
    width: 2rem;
    height: 2rem;
    background: url(${(props) => props.img}) no-repeat center;
    background-size: cover;
    border-radius: 50%;
  }
  & span {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 500;
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
    color: #5a5a5a;
  }
`;

const Title = styled.div`
  box-sizing: content-box;
  text-align: center;
  cursor: pointer;
  margin: auto;
  & span {
    font-family: AppleSDGothicNeoB;
    color: #2b61e1;
  }
`;

const Description = styled.div`
  box-sizing: content-box;
  text-align: center;
  position: relative;
  padding: 0 0.5rem;
  overflow: hidden;
`;

export default BoardCard;
