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

  // 이미지 변경
  const imageSave = () => {
    dispatch(profileActions.updateProfileImage(img));
  };

  // 닉네임 변경
  const nicknameSave = () => {
    dispatch(profileActions.nameUpdateProfile(name));
  };

  // 새 비밀번호 변경
  const newpwdSave = () => {
    dispatch(profileActions.pwdUpdateProfile(pwd, pwdConfirm));
  };

  const deleteaccount = () => {
    dispatch(profileActions.deleteAccountAPI());
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
        <Title>프로필 설정</Title>
        <Text5>프로필 이미지</Text5>

        <Image src={userprofile.user_img} onClick={triggerImg} />
        <input // input을 가려놓고 EDIT 버튼을 클릭했을 때 인풋이 실행되도록 만듬.
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={upload}
          style={{ display: "none" }}
        />
        <Lank>
          <GradeIcon grade={gradeImg} />
          <Member>
            {userprofile.memberGrade === null ? "" : userprofile.memberGrade.replace('_', ' ')}
          </Member>
        </Lank>
        <Button3 onClick={imageSave}>SAVE</Button3>

        <Text>닉네임</Text>
        <Input
          placeholder="NICKNAME"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Text4>
          3~12자 이내의 한글, 영문, 숫자, 특수문자(._)만 사용할 수 있습니다.
        </Text4>

        <Button1 onClick={nicknameSave}>SAVE</Button1>

        <Br />
        <Title2>개인 정보 설정</Title2>
        <Text2>새 비밀번호</Text2>
        <Input
          placeholder="NEW PASSWORD"
          type="password"
          onChange={(e) => setPwd(e.target.value)}
        />
        <Text6>
          8~12자 이내로 영문자, 숫자, 특수문자(!@#*)가 적어도 1개 이상 포함
          되어야 합니다.
        </Text6>
        <Text3>새 비밀번호 확인</Text3>

        <Input
          placeholder="NEW PASSWORD CONFIRM"
          type="password"
          onChange={(e) => setPwdConfirm(e.target.value)}
        />
        <Button1 onClick={newpwdSave}>SAVE</Button1>
        <Br />
        <Title3>회원 탈퇴</Title3>

        <Button2 onClick={deleteaccount}>DELETE ACCOUNT</Button2>
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
  cursor: pointer;
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
  margin-bottom: 0.3rem;
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

const Lank = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
const Text5 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  margin-left: -18rem;
  margin-bottom: 0.2rem;
  @media (max-width: 375px) {
    margin-left: -13.5rem;
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

const Text4 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #5a5a5a;
  margin-left: -1rem;
  margin-bottom: 0.2rem;
  @media (max-width: 375px) {
    width: 18rem;
    margin-left: 0.5rem;
  }
`;

const Text6 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #5a5a5a;
  width: 22rem;
  margin-left: 0.5rem;
  margin-bottom: 2rem;
  @media (max-width: 375px) {
    width: 18rem;
    margin-left: 0.5rem;
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
  margin-bottom: 3rem;
  background-color: #2b61e1;
  color: #ffffff;
  @media (max-width: 375px) {
    width: 18rem;
  }
`;

const Button2 = styled.button`
  font-size: 1rem;
  font-family: "paybooc-Bold";
  width: 22.2rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 3rem;
  background-color: #dcdcdc;
  color: #ffffff;
  @media (max-width: 375px) {
    width: 18rem;
  }
`;

const Button3 = styled.button`
  font-size: 1rem;
  font-family: "paybooc-Bold";
  width: 22.2rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-bottom: 5rem;
  background-color: #2b61e1;
  color: #ffffff;
  @media (max-width: 375px) {
    width: 18rem;
  }
`;

const GradeIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-position: center;
  background-image: url("${(props) => props.grade}");
  background-size: cover;
  margin: 0px auto;
  margin-top: -0.6rem;
  margin-right: 0.2rem;
`;

const Br = styled.div`
  width: 80%;
  height: 3rem;
  margin-top: 2rem;
  border-bottom: 3px solid #89acff;
  margin: 0px auto;
  margin-bottom: 5rem;
  @media (max-width: 540px) {
    width: 85%;
  }
  @media (max-width: 375px) {
    margin-left: 2rem;
    width: 85%;
  }
`;

const Title = styled.div`
  margin-left: -22rem;
  margin-bottom: 3rem;
  @media (max-width: 470px) {
    margin-left: 0rem;
    width: 85%;
  }
`;

const Title2 = styled.div`
  margin-left: -21rem;
  margin-bottom: 3rem;
  @media (max-width: 470px) {
    margin-left: 0rem;
    width: 85%;
  }
`;

const Title3 = styled.div`
  margin-left: -23rem;
  margin-bottom: 3rem;
  @media (max-width: 470px) {
    margin-left: 0rem;
    width: 85%;
  }
`;

const Member = styled.div`
  color: #2b61e1; 
  font-size: 1.2rem;
`;

export default ProfileSetting;
