import React, { useRef, useState } from "react";
import styled from "styled-components";

import { SET_PREVIEW } from "../redux/modules/profile";
import Dmypage from "media/svg/마이페이지 D.svg";
import edit from "media/svg/프로필수정.svg";
import { useDispatch, useSelector } from "react-redux";

import grade1 from "media/svg/등급1.svg";
import grade2 from "media/svg/등급2.svg";
import grade3 from "media/svg/등급3.svg";

import { actionCreators as profileActions } from "redux/modules/profile";

const ProfileSetting = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(profileActions.getProfile()); // 프로필 조회
  }, []);

  const nameRef = useRef();
  const newpwdRef = useRef();
  const newpwdcheckRef = useRef();
  const fileInput = useRef(); // DOM 객체 가져오기 (인풋)

  const [img, setImg] = useState(null);

  const Update = () => {
    const nickname = nameRef.current.value;
    const newpwd = newpwdRef.current.value;
    const newpwdcheck = newpwdcheckRef.current.value;

    if (!nickname || !newpwd || !newpwdcheck) {
      alert("모든 내용을 입력해주세요!");
      return;
    }
    dispatch(profileActions.updateProfile(nickname, newpwd, newpwdcheck, img));
  };

  const userprofile = useSelector((state) => state.profile);

  const upload = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    console.log(file);
    if (!file) {
      // 파일 선택 안했을 때
      return;
    }
    reader.readAsDataURL(file); // 이미지파일 url로 변경

    reader.onloadend = () => {
      //reader load 끝났을 때,
      setImg(file);
      dispatch(SET_PREVIEW(reader.result));
    };
  };

  const triggerImg = () => {
    fileInput.current.click(); // 인풋 클릭한 효과
  };

  // 유저 등급에 따른 등급 아이콘 보여주기
  const gradeImg = () => {
    if (userprofile.memberGrade === "TRAVELER") {
      return grade1;
    }
    if (userprofile.memberGrade === "TRAVEL_EDITOR") {
      return grade2;
    }
    if (userprofile.memberGrade === "TRAVEL_MASTER") {
      return grade3;
    }
  };

  return (
    <React.Fragment>
      <Wrap>
        <Icon></Icon>
        <Title>프로필 설정</Title>
        <SmallWrap>
          <ImageWrap>
            <Image src={userprofile.user_img} />
            <input // input을 가려놓고 EDIT 버튼을 클릭했을 때 인풋이 실행되도록 만듬.
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={upload}
              style={{ display: "none" }}
            />
            <Edit onClick={triggerImg}></Edit>
            <Lank>
              당신은 <GradeIcon src={gradeImg} />
              <Member>{userprofile.memberGrade}</Member>{" "}
            </Lank>
          </ImageWrap>

          <Text>닉네임</Text>
          <Input placeholder="NICKNAME" ref={nameRef} type="text" />
          {/* <Text>현재 비밀번호</Text>
          <Input placeholder="PASSWORD" type="password" /> */}
          <Text>새 비밀번호</Text>
          <Input placeholder="NEW PASSWORD" type="password" ref={newpwdRef} />
          <Text>새 비밀번호 확인</Text>
          <Input
            placeholder="NEW PASSWORD"
            type="password"
            ref={newpwdcheckRef}
          />
          <Button1 onClick={Update}>저장하기</Button1>
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "paybooc-Bold";
  margin: 0px auto;
  margin-left: 2rem;
`;

const SmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 22rem;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 6rem;
  border: 1px solid #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  background-position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

const Icon = styled.div`
  width: 2rem;
  height: 1.3rem;
  background-image: url("${Dmypage}");
  background-size: 2rem 1.3rem;
  margin-left: 5rem;
`;

const Title = styled.div`
  width: 8rem;
  color: #2b61e1;
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const Input = styled.input`
  font-size: 1rem;
  font-family: "paybooc-Bold";
  outline: none;
  width: 19rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: 1px solid #707070;
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "paybooc-Bold";
    color: #535353;
    opacity: 50%;
    font-size: 1rem;
  }
`;

const Edit = styled.div`
  cursor: pointer;
  width: 6rem;
  height: 3rem;
  background-image: url("${edit}");
  background-size: 6rem 3rem;
  margin-left: 10rem;
  margin-top: -2rem;
`;

const Lank = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Text = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  /* margin-left: -22rem; */
  margin-bottom: 0.2rem;
`;

const Button1 = styled.button`
  font-size: 1rem;
  font-family: "paybooc-Bold";
  width: 22.2rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #2b61e1;
  color: #ffffff;
`;

const Member = styled.div`
  font-family: "paybooc-Bold";
  font-size: 1.2rem;
  font-weight: 800;
  color: #2b61e1;
`;

const GradeIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.3rem;
  margin-right: 0.2rem;
  margin-left: 1rem;
`;

export default ProfileSetting;
