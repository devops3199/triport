import React, { useEffect, useState } from "react";
import styled from "styled-components";

import logo from "media/svg/triport_logo.svg";
import signuplogo from "media/image/triport_airplane.png";
import kakaoicon from "media/svg/kakao_symbol.svg";

import { useDispatch } from "react-redux";

import { emailCheck, pwdCheck } from "../shared/common";
import { actionCreators as userAcitons } from "../redux/modules/user";

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdcheck, setPwdcheck] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [line1, setLine1] = useState("1px solid #707070");
  const [line2, setLine2] = useState("1px solid #707070");
  const [line3, setLine3] = useState("1px solid #707070");

  // const signup = dispatch(userAcitons.signupDB(email, pwd, pwdcheck, nickname));

  useEffect(() => {
    if (!email) {
      setLine1("1px solid #707070");
      return;
    }
    if (emailCheck(email)) {
      setLine1("1px solid #2B61E1");
    } else {
      setLine1("1px solid #FF8080");
    }
  }, [email]);

  useEffect(() => {
    if (!pwd) {
      setLine2("1px solid #707070");
      return;
    }
    if (pwdCheck(pwd)) {
      setLine2("1px solid #2B61E1");
    } else {
      setLine2("1px solid #FF8080");
    }
  }, [pwd]);

  useEffect(() => {
    if (!pwdcheck) {
      setLine3("1px solid #707070");
      return;
    }
    if (pwdCheck(pwdcheck)) {
      setLine3("1px solid #2B61E1");
    } else {
      setLine3("1px solid #FF8080");
    }
  }, [pwdcheck]);

  const signup = () => {
    dispatch(userAcitons.signupDB(email, pwd, pwdcheck, nickname));
  };
  return (
    <React.Fragment>
      <Wrap>
        <SmallWrap>
          <Image />
          <Logo />
        </SmallWrap>

        <SmallWrap style={{ marginLeft: "10rem" }}>
          <Signup>SIGN UP</Signup>

          <EmailInput
            line={line1}
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></EmailInput>

          <Input
            placeholder="Nickname"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          ></Input>

          <PwdInput
            line={line2}
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></PwdInput>
          <PwdCheckInput
            line={line3}
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => {
              setPwdcheck(e.target.value);
            }}
          ></PwdCheckInput>

          <Text>가입 후 변경할 수 있어요!</Text>
          <Button1 onClick={signup}>SIGN UP</Button1>
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

const EmailInput = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: ${(props) => props.line};
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const PwdInput = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: ${(props) => props.line};
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const PwdCheckInput = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: ${(props) => props.line};
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const Input = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;

  border: 1px solid #707070;
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const Button1 = styled.button`
  font-family: "TTTogether";
  width: 24.5rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #2b61e1;
  color: #ffffff;
  cursor: pointer;
`;

const Button2 = styled.button`
  font-family: "TTTogether";
  width: 24.5rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #ffe600;
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
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  width: 24.5rem;
`;
