import React from "react";
import styled from "styled-components";

import loginlogo from "media/image/login_logo.png";
import kakaoicon from "media/svg/kakao_symbol.svg";

const Login = () => {
  return (
    <React.Fragment>
      <Wrap>
        <Image />
        <LoginDiv>LOGIN</LoginDiv>
        <Input placeholder="E-mail"></Input>
        <Input placeholder="PASSWORD"></Input>
        <Button1>LOGIN</Button1>
        <Button2>
          <Kakao />
          카카오톡으로 로그인
        </Button2>
        <Text href="/signup">회원가입</Text>
        <Text>비밀번호 찾기</Text>
      </Wrap>
    </React.Fragment>
  );
};

export default Login;

const Wrap = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  font-family: "TTTogether";
`;

const Image = styled.div`
  background-image: url("${loginlogo}");
  background-size: 23rem 18.75rem;
  width: 23rem;
  height: 18.75rem;
`;

const LoginDiv = styled.div`
  display: flex;
  font-size: 1.625rem;
  width: 22rem;
  margin: 0px auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  justify-content: center;
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
  margin-bottom: 2rem;
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
  margin-bottom: 2rem;
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
  margin-bottom: 1rem;
`;
