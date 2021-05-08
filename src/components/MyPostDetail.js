import React from "react";
import styled from "styled-components";

import Blike from "media/svg/좋아요B.svg";

const MyPostDerail = (props) => {
  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <Wrap>
        <Profile>
          <ProfileImg />
          <ProfileId>Triport</ProfileId>
        </Profile>
        <View></View>
        <LowWrap>
          <Icon />
          <p style={{ color: "#8B8888" }}>좋아요 +100</p>
          <Tag>#강릉 #여행 #맛집</Tag>
        </LowWrap>
        <Button>삭제하기</Button>
      </Wrap>
    </React.Fragment>
  );
};

export default MyPostDerail;

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
  opacity: 0.4;
`;
const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background-color: white;
  width: 57rem;
  height: 37rem;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  margin: 0px auto;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  padding: 3rem;
`;

const LowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3.5rem;
  margin-top: 1rem;
`;

const Profile = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 2.5rem;
  margin-bottom: 1rem;
`;

const ProfileImg = styled.div`
  --size: 38px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-position: center;
  background-image: url("https://cdn.discordapp.com/attachments/578800402036949002/812000337707663401/0Yt.png");
  background-size: cover;
  margin-left: 16px;
  display: flex;
`;

const ProfileId = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 11px;
  align-items: center;
`;

const View = styled.div`
  width: 50rem;
  height: 21.5rem;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  margin: 0px auto;
`;

const Icon = styled.div`
  background-image: url("${Blike}");
  background-size: cover;
  width: 1.625rem;
  height: 1.46rem;
  margin-right: 1rem;
`;

const Tag = styled.p`
  font-weight: 700;
  margin-left: 1rem;
`;

const Button = styled.button`
  font-family: "TTTogether";
  font-size: 1rem;
  color: #ffffff;
  background-color: #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  width: 20rem;
  height: 3rem;
  margin: 0px auto;
  margin-top: 5rem;
`;
