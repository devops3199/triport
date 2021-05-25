import React from "react";
import styled from "styled-components";
import { CommentLike } from "media/svg/Svg";
import { config } from "redux/modules/config";
import Swal from "sweetalert2";

const BoardChildComment = (props) => {
  const { comment, setData } = props; // 부모 댓글 state 변경을 위해 setData 가져옴
  const [likeNum, setLikeNum] = React.useState(comment.commentChild.likeNum); // 자식 댓글 좋아요 여부
  const [edit, setEdit] = React.useState(false); // 자식 댓글 수정 버튼 토글 - input 태그 활성화 여부
  const [childCommentEdit, setChildCommentEdit] = React.useState(comment.commentChild.contents); // 자식 댓글 내용
  const [childCommentDate, setChildCommentDate] = React.useState(comment.commentChild.modifiedAt); // 자식 댓글 등록 시간

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
      Swal.fire({
          title: data.msg,
          icon: "success",
      });
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
    Swal.fire({
      title: '해당 댓글을 삭제하시겠습니까?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `삭제`,
      denyButtonText: `취소`,
    }).then((result) => {
      if (result.isConfirmed) {
        setData(prevState => {
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
            Swal.fire({
              title: data.msg,
              icon: "success",
          });
        })
        .catch(err => console.log(err, 'remove child comment trilog'));
      }
    });
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

  @media (max-width: 600px) {
    font-size: 14px;
  }
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
  
  @media (max-width: 980px) {
    display: none;
  }
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
  height: 40px;
  border: 1px solid rgb(43, 97, 225, 0.6);
  border-radius: 5px;
  padding: 0 1rem;
`;
