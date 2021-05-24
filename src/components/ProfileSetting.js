import React, { useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import { SET_PREVIEW } from "../redux/modules/profile";
import { nameCheck, pwdCheck } from "shared/common";
import edit from "media/svg/프로필수정.svg";
import { useDispatch, useSelector } from "react-redux";

import grade1 from "media/svg/등급1.svg";
import grade2 from "media/svg/등급2.svg";
import grade3 from "media/svg/등급3.svg";

import { actionCreators as profileActions } from "redux/modules/profile";

const ProfileSetting = () => {
  const dispatch = useDispatch();

  const userprofile = useSelector((state) => state.profile);
  const user_ninkname = useSelector((state) => state.profile.nickname);

  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");

  React.useEffect(() => {
    dispatch(profileActions.getProfile()); // 프로필 조회
  }, []);

  React.useEffect(() => {
    setName(user_ninkname);
  }, [user_ninkname]);

  const fileInput = useRef(); // DOM 객체 가져오기 (인풋)

  const Update = () => {
    if (name == user_ninkname && pwd == "" && pwdConfirm == "") {
      Swal.fire({
        title: "프로필 정보 변경사항이 없습니다.",
        icon: "warning",
      });
      return;
    }
    if (!nameCheck(name)) {
      Swal.fire({
        title:
          "닉네임은 한글, 영문, 숫자, 특수문자(._)만 3-12자리 이내로 입력할 수 있습니다.",
        icon: "warning",
      });
      return;
    }

    if (pwd !== pwdConfirm) {
      Swal.fire({
        title: "비밀번호가 다릅니다.",
        icon: "warning",
      });
      return;
    }

    if (!pwdCheck(pwd) && pwd !== "") {
      Swal.fire({
        title:
          "비밀번호는 영문자와 숫자, 특수문자(!@#*)가 적어도 1개 이상 포함되도록 8-20자리 이내로 입력해 주세요.",
        icon: "warning",
      });
      return;
    }

    dispatch(profileActions.updateProfile(name, pwd, pwdConfirm));
  };

  const imageSave = () => {
    dispatch(profileActions.updateProfileImage(img));
  };

  const upload = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    // console.log(file);
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
        <Image src={userprofile.user_img} />
        <input // input을 가려놓고 EDIT 버튼을 클릭했을 때 인풋이 실행되도록 만듬.
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={upload}
          style={{ display: "none" }}
        />
        <Edit onClick={triggerImg}></Edit>
        <Edit2 onClick={imageSave}>SAVE</Edit2>
        <Lank>
          당신은 <GradeIcon grade={gradeImg} />
          <Member>{userprofile.memberGrade}</Member>{" "}
        </Lank>

        <Text>닉네임</Text>
        <Input
          placeholder="NICKNAME"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Text2>새 비밀번호</Text2>
        <Input
          placeholder="NEW PASSWORD"
          type="password"
          onChange={(e) => setPwd(e.target.value)}
        />
        <Text3>새 비밀번호 확인</Text3>
        <Input
          placeholder="NEW PASSWORD CONFIRM"
          type="password"
          onChange={(e) => setPwdConfirm(e.target.value)}
        />
        <Button1 onClick={Update}>저장하기</Button1>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "paybooc-Bold";
  width: 100vw;
  margin: 0px;
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
  @media (max-width: 375px) {
    width: 9rem;
    height: 9rem;
  }
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
  @media (max-width: 375px) {
    width: 15rem;
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

const Edit2 = styled.button`
  cursor: pointer;
  width: 2.5rem;
  height: 1.13rem;
  margin-left: 16rem;
  margin-top: -2.05rem;
  margin-bottom: 1rem;
  border: 1px solid #89acff;
  border-radius: 5px;
  background-color: #89acff;
  color: #464646;
  font-size: 0.7rem;
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
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  margin-left: -20rem;
  margin-bottom: 0.2rem;
  @media (max-width: 375px) {
    margin-left: -16rem;
  }
`;

const Text2 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  margin-left: -18rem;
  margin-bottom: 0.2rem;
  @media (max-width: 375px) {
    margin-left: -14rem;
  }
`;

const Text3 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  margin-left: -16.5rem;
  margin-bottom: 0.2rem;
  @media (max-width: 375px) {
    margin-left: -12.5rem;
  }
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
  @media (max-width: 375px) {
    width: 18rem;
  }
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
  background-image: url("${(props) => props.grade}");
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.3rem;
  margin-right: 0.2rem;
  margin-left: 1rem;
`;

export default ProfileSetting;
