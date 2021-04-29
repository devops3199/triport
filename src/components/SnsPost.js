import React from "react";
import styled from "styled-components";
import { ReactComponent as LikeTrue } from "../media/svg/좋아요_blue.svg";
import like_false from "../media/svg/좋아요.svg";
import comment from "../media/svg/댓글.svg";
import bookmark from "../media/svg/저장.svg";
import Slider from "components/Slider";

const SnsPost = (props) => {
  const { margin } = props;
  const styles = {
    margin: margin,
  };

  console.log(margin);

  return (
    <Post {...styles}>
      <PostCov>
        <PostTop>
          <Profile>
            <ProfileImg />
            <ProfileId>Triport</ProfileId>
          </Profile>
          <MainImg>
            <Slider />
          </MainImg>
          <PostCovBottom>
            <Likecomment>
              <Islike>
                <LikeTrue />
              </Islike>
              <Comment>
                <CommentImg comment={comment} />
              </Comment>
            </Likecomment>
            <Bookmark>
              <BookmarkImg />
            </Bookmark>
          </PostCovBottom>
        </PostTop>
      </PostCov>
      <PostBottom>
        <PostLikeCommentSave>
          <PostLikeCnt>좋아요 +100</PostLikeCnt>
          <PostCommentCnt>댓글 +100</PostCommentCnt>
        </PostLikeCommentSave>
        <PostUser>
          <PostUserID>Triport</PostUserID>
          <PostUserComment>인천 앞바다 갈매기와 한 컷</PostUserComment>
        </PostUser>
      </PostBottom>
    </Post>
  );
};

SnsPost.defaultProps = {
  margin: false,
};

const Post = styled.div`
  ${(props) => (props.margin ? "" : "margin-left:40px")};
  display: flex;
  flex-direction: column;
`;

const PostBottom = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const PostLikeCnt = styled.div`
  font-family: "AppleSDGothicNeoR";
  display: flex;
`;

const PostCommentCnt = styled.div`
  font-family: "AppleSDGothicNeoR";
  margin-left: 15px;
  display: flex;
`;

const PostLikeCommentSave = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const PostUser = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const PostUserID = styled.div`
  font-family: "AppleSDGothicNeoB";
  display: flex;
`;

const PostUserComment = styled.div`
  font-family: "AppleSDGothicNeoR";
  display: flex;
  margin-left: 18px;
`;

const MainImg = styled.div`
  display: flex;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Profile = styled.div`
  margin-top: 13px;
  display: flex;
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

const ProfileId = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 11px;
  align-items: center;
`;

const PostTop = styled.div`
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

const PostCovBottom = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
`;

const Comment = styled.div`
  display: flex;
  margin-left: 12px;
`;

const CommentImg = styled.div`
  width: 26px;
  height: 23px;
  display: flex;
  background: url(${(props) => props.comment});
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
const PostCov = styled.div`
  // background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  // background-size: contain;
  // background-position: center;
  // background-repeat: no-repeat;
  display: flex;
  width: 400px;
  height: 400px;
  background: #ededed;
  /* border: 1px solid;
  border-radius: 15px; */
`;

export default SnsPost;
