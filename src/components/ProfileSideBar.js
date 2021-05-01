import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Bmypage from "media/svg/마이페이지 B.svg";
import Wmypage from "media/svg/마이페이지w.svg";
import Bmypost from "media/svg/내가 쓴 글 B.svg";
import Wmypost from "media/svg/내가 쓴 글 w.svg";
import Blike from "media/svg/좋아요B.svg";
import Wlike from "media/svg/좋아요w.svg";

import {
  CLICK_SETTING,
  CLICK_WRITE,
  CLICK_LIKE,
} from "../redux/modules/sidebar";

const ProfileSideBar = () => {
  const setting = useSelector((state) => state.sidebar.setting);
  const write = useSelector((state) => state.sidebar.write);
  const like = useSelector((state) => state.sidebar.like);
  const dispatch = useDispatch();
  console.log(setting, write, like);

  const clicksetting = () => {
    dispatch(CLICK_SETTING());
  };

  const clickwrite = () => {
    dispatch(CLICK_WRITE());
  };

  const clicklike = () => {
    dispatch(CLICK_LIKE());
  };

  return (
    <Profile>
      <Sidebar>
        <SideCover>
          <ProfileSetting onClick={clicksetting} toggle={setting}>
            {/* <profileIcon1></profileIcon1> */}
            <Setting>프로필설정</Setting>
          </ProfileSetting>
          <ProfileMyPost onClick={clickwrite} toggle={write}>
            <Setting>내가쓴글</Setting>
          </ProfileMyPost>
          <ProfileLike onClick={clicklike} toggle={like}>
            <Setting>좋아요</Setting>
          </ProfileLike>
        </SideCover>
      </Sidebar>
    </Profile>
  );
};

const Profile = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Sidebar = styled.div`
  display: flex;
  width: 9.7rem;
  height: 9.3rem;
  background: #f4f4f4;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;
`;

const SideCover = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProfileSetting = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) => (props.toggle ? `background: #2b61e1; color:white;` : "")};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;

const Setting = styled.div`
  font-family: "TTTogether";
  display: flex;
`;

const ProfileMyPost = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) => (props.toggle ? `background: #2b61e1; color:white;` : "")};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileLike = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) => (props.toggle ? `background: #2b61e1; color:white;` : "")};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;

// const profileIcon1 = styled.div`
//   width: 0.9rem;
//   height: 0.5rem;
//   background-image: url("${Bmypage}");
//   background-size: 0.9rem 0.5rem;
// `;

export default ProfileSideBar;
