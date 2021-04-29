import React, { Fragment, useState } from "react";
import styled from "styled-components";
import SettingOn from "../media/svg/마이페이지w.svg";

const ProfileSideBar = () => {
  const [setting, Setsetting] = useState(true)
  const [write, setWrite] = useState(false)
  const [like, setLike] = useState(false)

  return (
    <Profile>
      <Sidebar>
        <SideCover>
          <ProfileSetting>
            <Setting toggle={setting}>프로필설정</Setting>
          </ProfileSetting>
          <ProfileMyPost>
            <Setting toggle={write}>내가쓴글</Setting>
          </ProfileMyPost>
          <ProfileLike>
            <Setting toggle={like}>좋아요</Setting>
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
  width: 80rem;
  margin: 0px auto;
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
  background: #2b61e1;
  border-radius: 5px;
  opacity: 1;
`;

const Setting = styled.div`
  font-family: "TTTogether";
  display: flex;
`;

const ProfileMyPost = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  background: #2b61e1;
  border-radius: 5px;
  opacity: 1;
`;

const ProfileLike = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  background: #2b61e1;
  border-radius: 5px;
  opacity: 1;
`;

export default ProfileSideBar;
