import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SettingOn from "../media/svg/마이페이지w.svg";
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

const Settingsvg = styled.div`
  background-image: url("${SettingOn}");
  background-size: 11px;
  width: 11px;
  height: 11px;
`;

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

export default ProfileSideBar;
