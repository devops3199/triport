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
  // console.log(setting, write, like);

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
            <ProfileIcon toggle={setting}></ProfileIcon>
            <Setting>내 정보</Setting>
          </ProfileSetting>
          <ProfileMyPost onClick={clickwrite} toggle={write}>
            <MyPostIcon toggle={write} />
            <Setting style={{ marginLeft: "-1.4rem" }}>내가 쓴 글</Setting>
          </ProfileMyPost>
          <ProfileLike onClick={clicklike} toggle={like}>
            <MyLikeIcon toggle={like} />
            <Setting>좋아요</Setting>
          </ProfileLike>
        </SideCover>
      </Sidebar>
    </Profile>
  );
};

const Profile = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px;
  margin-bottom: 5rem;
  width: 100vw;
  @media (max-width: 375px) {
    margin-bottom: 2rem;
  }
`;

const Sidebar = styled.div`
  display: flex;
  width: 27rem;
  height: 3.5rem;
  margin: 0px auto;
  background: #f4f4f4;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;

  @media (max-width: 490px) {
    width: 22rem;
  }
  @media (max-width: 375px) {
    width: 19rem;
  }
`;

const SideCover = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProfileSetting = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) =>
    props.toggle ? `background: #2b61e1; color:#FFFFFF;` : "color:#89ACFF"};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
  @media (max-width: 490px) {
    width: 7rem;
  }
  @media (max-width: 375px) {
    width: 5.5rem;
    margin-right: 1rem;
  }
`;

const Setting = styled.div`
  font-family: "paybooc-Bold";
  display: flex;
  @media (max-width: 490px) {
    font-size: 0.8rem;
  }
  @media (max-width: 375px) {
    font-size: 0.7rem;
  }
`;

const ProfileMyPost = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) =>
    props.toggle ? `background: #2b61e1; color:#FFFFFF;` : "color:#89ACFF"};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
  @media (max-width: 490px) {
    width: 7rem;
  }
  @media (max-width: 375px) {
    width: 5.5rem;
    margin-right: 1rem;
  }
`;

const ProfileLike = styled.div`
  display: flex;
  width: 8.5rem;
  height: 2.25rem;
  ${(props) =>
    props.toggle ? `background: #2b61e1; color:#FFFFFF;` : "color:#89ACFF"};
  cursor: pointer;
  border-radius: 5px;
  opacity: 1;
  justify-content: center;
  align-items: center;
  @media (max-width: 490px) {
    width: 7rem;
  }
  @media (max-width: 375px) {
    width: 5.5rem;
  }
`;

const ProfileIcon = styled.div`
  width: 1.2rem;
  height: 1rem;
  background-size: 1.2rem 1rem;
  margin-right: 0.7rem;

  @media (max-width: 375px) {
    margin-right: 0.5rem;
  }

  ${(props) =>
    props.toggle
      ? `background-image:url('${Wmypage}')`
      : `background-image:url('${Bmypage}')`}
`;

const MyPostIcon = styled.div`
  width: 1.5rem;
  height: 1.3rem;
  background-size: 1.5rem 1.3rem;
  margin-left: -0.7rem;
  margin-right: 2.2rem;
  @media (max-width: 375px) {
    margin-right: 1.5rem;
  }

  ${(props) =>
    props.toggle
      ? `background-image:url('${Wmypost}')`
      : `background-image:url('${Bmypost}')`}
`;

const MyLikeIcon = styled.div`
  width: 1.2rem;
  height: 1rem;
  background-size: 1.2rem 1rem;
  margin-right: 0.7rem;
  margin-left: -2rem;
  @media (max-width: 375px) {
    margin-left: -1rem;
    margin-right: 0.5rem;
  }

  ${(props) =>
    props.toggle
      ? `background-image:url('${Wlike}')`
      : `background-image:url('${Blike}')`}
`;

export default ProfileSideBar;
