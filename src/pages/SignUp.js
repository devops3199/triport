import React from "react";
import styled from "styled-components";

import logo from "media/svg/triport_logo.svg";
import signuplogo from "media/image/triport_airplane.png";
import kakaoicon from "media/svg/kakao_symbol.svg";

const SignUp = () => {
  return (
    <React.Fragment>
      <Wrap>
        <SmallWrap>
          <Image />
          <Logo />
        </SmallWrap>

        <SmallWrap style={{ marginLeft: "10rem" }}>
          <Signup>SIGN UP</Signup>
          <Input placeholder="E-mail"></Input>
          <Input placeholder="Nickname"></Input>
          <Input placeholder="PASSWORD"></Input>
          <Input placeholder="PASSWORD"></Input>
          <Text>가입 후 변경할 수 있어요!</Text>
          <Button1>SIGN UP</Button1>
          <Button2>
            <Kakao />
            카카오톡으로 가입하기
          </Button2>
          <Text href="/login">로그인 하러 가기</Text>
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

export default SignUp;

const Wrap = styled.div`
  width: 58rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px auto;
  font-family: "TTTogether";
`;

const SmallWrap = styled.div`
  width: 23rem;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  background-image: url("${signuplogo}");
  background-size: 23rem 20rem;
  width: 23rem;
  height: 20rem;
  margin: 0px auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  background-image: url("${logo}");
  background-size: 14rem 2.56rem;
  width: 14rem;
  height: 2.56rem;
`;

const Signup = styled.div`
  font-size: 1.625rem;
  color: #535353;
  margin: 0px auto;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: 1px solid #707070;
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    color: #535353;
    opacity: 50%;
  }
`;

const Button1 = styled.button`
  font-family: "TTTogether";
  width: 23rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #2b61e1;
  color: #ffffff;
`;

const Button2 = styled.button`
  font-family: "TTTogether";
  width: 23rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  background-color: #ffe600;
  font-size: 1rem;
  color: #2b1718;
`;

const Kakao = styled.div`
  display: flex;
  margin: 0px;
  background-image: url("${kakaoicon}");
  background-size: 21.51px 19.86px;
  width: 21.51px;
  height: 19.86px;
  margin-right: 1rem;
`;

const Text = styled.a`
  text-decoration: none;
  font-family: "AppleSDGothicNeoR";
  color: #5a5a5a;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;
