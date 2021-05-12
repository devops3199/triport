import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { config } from "redux/modules/config";

const BoardChildComment = (props) => {
  const { comment, setData } = props; // parent comment id
  const [likeNum, setLikeNum] = React.useState(comment.commentChild.likeNum);
  const [edit, setEdit] = React.useState(false);
  const [childCommentEdit, setChildCommentEdit] = React.useState(comment.commentChild.contents);
  const [childCommentDate, setChildCommentDate] = React.useState(comment.commentChild.modifiedAt);

  const hitLike = () => {
    const access_token = localStorage.getItem("access_token");
    const api = `${config}/api/boards/comments/children/like/${comment.commentChild.id}`;

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg.includes("추가")) {
          setLikeNum((prevState) => prevState + 1);
        } else {
          setLikeNum((prevState) => prevState - 1);
        }
      })
      .catch((err) => console.log(err, "child comment like"));
  };

  const showEdit = () => {
    setEdit(!edit);
  };

  const editComment = () => {
    const access_token = localStorage.getItem("access_token");
    fetch(`${config}/api/boards/comments/children/${comment.commentChild.id}`, {
        method : 'PUT',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${access_token}`,
        },
        body: JSON.stringify({
            contents: childCommentEdit,
        })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.msg);
      setChildCommentDate(data.results.commentChild.modifiedAt);
    })
    .catch(err => console.log(err, 'edit child comment trilog'));

    setData(prevState => {
      prevState.forEach((val) => {
        if(val.commentChild.id === comment.commentChild.id) {
          val.commentChild.contents = childCommentEdit;
          val.commentChild.modifiedAt = childCommentDate;
        }
      })
      
      return prevState;
    });

    setEdit(!edit);
  };

  const deleteComment = () => {
    if (window.confirm("해당 대댓글을 삭제하시겠습니까?")) {
      setData(prevState => {
        console.log(prevState.filter((val) => val.commentChild.id !== comment.commentChild.id),'prev')
        return prevState.filter((val) => val.commentChild.id !== comment.commentChild.id);
      });

      const access_token = localStorage.getItem("access_token");
      fetch(`${config}/api/boards/comments/children/${comment.commentChild.id}`, {
          method : 'DELETE',
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${access_token}`,
          }
      })
      .then(res => res.json())
      .then(data => {
          alert(data.msg);
      })
      .catch(err => console.log(err, 'remove child comment trilog'));
    }
  };

  return (
    <div>
      <ChildComment>
        <UserContainer>
          <img src={comment.author.profileImgUrl} />
          <span>{comment.author.nickname}</span>
        </UserContainer>
        <Content>
          {edit ? (
            <>
              <EditInput
                type="text"
                value={childCommentEdit}
                onChange={(e) => setChildCommentEdit(e.target.value)}
                onKeyPress={() => {
                  if (window.event.keyCode === 13) {
                    editComment();
                  }
                }}
              />
            </>
          ) : (
            <>
              <div>{comment.commentChild.contents}</div>
              <Date>{comment.commentChild.modifiedAt}</Date>
            </>
          )}
        </Content>
      </ChildComment>
      <Likes>
        <LikeSpan>
          <div onClick={hitLike}>
            <CommentLike />
          </div>
          <span>+{likeNum}</span>
        </LikeSpan>
        {comment.user.isMembers ? (
          <>
            <EditButton
              type="button"
              value={edit ? "취소" : "수정"}
              onClick={showEdit}
            />
            <DeleteButton type="button" value="삭제" onClick={deleteComment} />
          </>
        ) : (
          <></>
        )}
      </Likes>
    </div>
  );
};

export default BoardChildComment;

const ChildComment = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-family: "AppleSDGothicNeoB";

  & img {
    width: 2.375rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  position: absolute;
  right: 0;
`;

const Likes = styled.div`
  margin: 0.5rem 0 0.5rem 2.5rem;
  display: flex;
  align-items: center;

  & span {
    width: 65px;
  }
`;

const LikeSpan = styled.span`
  display: flex;
  align-items: center;

  & svg {
    cursor: pointer;
    width: 1.2rem;
    margin-right: 0.5rem;
  }

  & span {
    font-size: 15px;
  }
`;

const EditButton = styled.input`
  cursor: pointer;
  background-color: #2b61e1;
  color: #fff;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  margin: 0 0.5rem;
  font-size: 11px;
`;

const DeleteButton = styled.input`
  cursor: pointer;
  background-color: #f22d3f;
  border: 1px solid #f22d3f;
  color: #fff;
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  font-size: 11px;
`;

const EditInput = styled.input`
  outline: none;
  border: 0;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  padding: 0 1rem;
`;
