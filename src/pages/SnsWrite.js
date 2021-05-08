import React from "react";
import styled from "styled-components";

const SnsWrite = () => {
  return (
    <React.Fragment>
      <Wrap>
        <VideoView>
          <p style={{ fontSize: "25px" }}>영상을 올려주세요.</p>
          <p style={{ fontSize: "15px" }}>10MB 제한</p>
        </VideoView>
        <Text>#강릉 #여행 #맛집</Text>
        <Tag>태그 (최대 3개)</Tag>
        <Input placeholder="# 자유롭게 적고 엔터를 눌러주세요."></Input>
      </Wrap>
      <ButtonWrap>
        <Button ok>작성완료</Button>
        <Button>취소</Button>
      </ButtonWrap>
    </React.Fragment>
  );
};

export default SnsWrite;

const Wrap = styled.div`
  font-family: "TTTogether";
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoView = styled.div`
  width: 37rem;
  height: 28rem;
  margin: 0px auto;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2b61e1;
  margin-top: 5rem;
`;

const Text = styled.div`
  width: 37rem;
  font-family: "AppleSDGothicNeoR";
  font-size: 15px;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Tag = styled.div`
  width: 37rem;
  color: #2b61e1;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  outline: none;
  width: 35rem;
  height: 2.5rem;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
`;

const ButtonWrap = styled.div`
  width: 50rem;
  margin: 0px auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-family: "TTTogether";
  color: #ffffff;
  font-size: 1rem;
  width: 20rem;
  height: 3rem;
  background-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid;
  border-color: ${(props) => (props.ok ? "#2b61e1" : "#707070")};
  border-radius: 5px;
`;
