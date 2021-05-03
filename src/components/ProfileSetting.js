import React, { useRef } from "react";
import styled from "styled-components";
import image from "../media/image/login_logo.png";

import EditModal from "./EditModal";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

import Dmypage from "media/svg/마이페이지 D.svg";
import edit from "media/svg/프로필수정.svg";

const ProfileSetting = () => {
  const [modal, setModal] = React.useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      <Wrap>
        <Icon></Icon>
        <Title>프로필 설정</Title>
        <SmallWrap>
          <ImageWrap>
            <Image src={image} />
            <Edit onClick={openModal}></Edit>
            <Lank>당신의 등급은 ?</Lank>
          </ImageWrap>

          <Text>닉네임</Text>
          <Input placeholder="Nickname" />
          <Text>현재 비밀번호</Text>
          <Input placeholder="PASSWORD" />
          <Text>새 비밀번호</Text>
          <Input placeholder="NEW PASSWORD" />
          <Text>새 비밀번호 확인</Text>
          <Input placeholder="NEW PASSWORD" />
          <Button1>저장하기</Button1>

          {/* <EditModal modal={modal} onClose={closeModal} /> */}
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "TTTogether";
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
  margin-left: 10rem;
`;

const Title = styled.div`
  width: 8rem;
  color: #2b61e1;
  margin-left: 1rem;
  font-size: 1.2rem;
`;

const Input = styled.input`
  font-size: 1rem;
  font-family: "TTTogether";
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
    font-family: "TTTogether";
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
  /* margin-top: 1rem; */
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
  font-family: "TTTogether";
  width: 22.2rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #2b61e1;
  color: #ffffff;
`;

export default ProfileSetting;
