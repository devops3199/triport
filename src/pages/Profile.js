import ProfileSetting from "components/ProfileSetting";
import ProfileMyPost from "components/ProfileMyPost";
import ProfileLike from "components/ProfileLike";
import ProfileSideBar from "components/ProfileSideBar";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Profile = () => {
  const setting = useSelector((state) => state.sidebar.setting);
  const write = useSelector((state) => state.sidebar.write);
  const like = useSelector((state) => state.sidebar.like);
  return (
    <Cover>
      <ProfileSideBar />
      {setting ? (
        <>
          <ProfileSetting />
        </>
      ) : (
        <></>
      )}
      {write ? (
        <>
          <ProfileMyPost />
        </>
      ) : (
        <></>
      )}
      {like ? (
        <>
          <ProfileLike />
        </>
      ) : (
        <></>
      )}
    </Cover>
  );
};

const Cover = styled.div`
  display: flex;
  flex-direction: row;
  width: 1280px;
  margin: 0 auto;
`;

export default Profile;
