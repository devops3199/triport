import React, { Fragment } from "react";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import like_true from "../media/image/like_on.png";
import like_false from "../media/image/like_off.png";
import comment from "../media/image/comment.png";
import bookmark from "../media/image/bookmark.png";

const Snsmain = () => {
  return (
    <Fragment>
      <Postcv>
        <Post>
          <Mainwhole>
            <Profile>
              <ProfileImg />
              <ProfileId>Triport</ProfileId>
            </Profile>
            <MainImg>
              <Carousel
                autoPlay={false}
                animation={"slide"}
                indicators={true}
                timeout={500}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={false}
              >
                <Tt />
                <Tt />
                <Tt />
              </Carousel>
            </MainImg>
            <Postbottom>
              <Likecomment>
                <Islike>
                  <LikeImg like={like_true} />
                </Islike>
                <Comment>
                  <CommentImg comment={comment} />
                </Comment>
              </Likecomment>
              <Bookmark>
                <BookmarkImg />
              </Bookmark>
            </Postbottom>
          </Mainwhole>
        </Post>
        <Post></Post>
        <Post></Post>
      </Postcv>
    </Fragment>
  );
};

const MainImg = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
`;

const Profile = styled.div`
  margin-top: 13px;
  display: flex;
`;

const Te = styled.div`
  display: flex;
  z-index: -99;
`;

const ProfileImg = styled.div`
  --size: 38px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-position: center;
  background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  background-size: cover;
  margin-left: 16px;
  display: flex;
`;

const Tt = styled.div`
  background: black;
  background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  width: 400px;
  height: 200px;
`;

const ProfileId = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 11px;
  align-items: center;
`;

const Mainwhole = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Likecomment = styled.div`
  display: flex;
`;

const Islike = styled.div`
  display: flex;
`;

const Postbottom = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
`;

const LikeImg = styled.div`
  width: 26px;
  height: 23px;
  display: flex;
  background: url(${like_true});
  background-size: cover;
  cursor: pointer;
`;

const Comment = styled.div`
  display: flex;
  margin-left: 12px;
`;

const CommentImg = styled.div`
  width: 26px;
  height: 23px;
  display: flex;
  background: url(${comment});
  background-size: cover;
  cursor: pointer;
`;

const Bookmark = styled.div`
  display: flex;
`;

const BookmarkImg = styled.div`
  width: 15px;
  height: 23px;
  display: flex;
  background: url(${bookmark});
  background-size: cover;
  cursor: pointer;
`;
const Post = styled.div`
  // background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  // background-size: contain;
  // background-position: center;
  // background-repeat: no-repeat;
  display: flex;
  width: 400px;
  height: 400px;
  border: 1px solid;
  border-radius: 15px;
`;

const Postcv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1280px;
  margin: 0px auto;
`;

const Test = styled.div`
  display: flex;
`;

export default Snsmain;
