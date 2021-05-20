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

  // 카카오 로그인 Redirect_url
  const KAKAO_URL =
    // "https://kauth.kakao.com/oauth/authorize?client_id=b30e166ade03d146889e1b012679fcf6&redirect_uri=http://triport.kr/auth/kakao/callback&response_type=code";
    "https://kauth.kakao.com/oauth/authorize?client_id=b30e166ade03d146889e1b012679fcf6&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code";

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
    // 값이 하나라도 없다면 alert 띄워주기
    if (!email || !nickname || !pwd || !pwdcheck) {
      window.alert("모든 내용을 입력해주세요!");
      return;
    }
    // 이메일 정규표현식에 맞지 않을 때
    if (!emailCheck(email)) {
      window.alert("이메일 형식으로 입력해주세요!");
      return;
    }
    if (2 > nickname.length > 6) {
      window.alert("닉네임의 길이는 3~5글자입니다.");
      console.log(nickname.length);
      return;
    }
    // 비밀번호 정규표현식에 맞지 않을 때
    if (!pwdCheck(pwd)) {
      window.alert("8~20자리의 영문과 숫자, 특수문자(!@#*)를 조합해주세요!");
      return;
    }
    // 비밀번호와 비밀번호확인이 일치하지 않을 때
    if (pwd !== pwdcheck) {
      window.alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    dispatch(userAcitons.signupDB(email, pwd, pwdcheck, nickname));
  };
  return (
    <React.Fragment>
      <Wrap>
        <SmallWrap>
          <Image />
          <Logo />
        </SmallWrap>

        <SmallWrap2>
          <Signup>SIGN UP</Signup>

          <EmailInput
            line={line1}
            placeholder="E-MAIL"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></EmailInput>

          <Input
            // minLength="3"
            // maxLength="5"
            placeholder="NICKNAME"
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
          <Button2 href={KAKAO_URL}>
            <Kakao />
            카카오톡으로 가입하기
          </Button2>
          <Text href="/login">로그인 하러 가기</Text>
        </SmallWrap2>
      </Wrap>
    </React.Fragment>
  );
};

export default SignUp;

const Wrap = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px auto;
  font-family: "paybooc-Bold";
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SmallWrap = styled.div`
  width: 23rem;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
`;

const SmallWrap2 = styled.div`
  width: 23rem;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  justify-content: center;
  align-items: center;
  margin-left: 8rem;
  @media (max-width: 980px) {
    margin-left: 1rem;
    margin: 0px auto;
  }
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin: 0px auto;
  }
  @media (max-width: 600px) {
    margin-left: 0rem;
    margin: 0px auto;
  }
`;

const Image = styled.div`
  background-image: url("${signuplogo}");
  background-size: 23rem 20rem;
  width: 23rem;
  height: 20rem;
  margin: 0px auto;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    background-size: 15rem 13rem;
    width: 15rem;
    height: 13rem;
  }

  @media (max-width: 600px) {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    background-size: 13rem 11rem;
    width: 13rem;
    height: 11rem;
  }
`;

const Logo = styled.div`
  background-image: url("${logo}");
  background-size: 14rem 2.56rem;
  width: 14rem;
  height: 2.56rem;
  @media (max-width: 600px) {
    background-size: 12rem 2.56rem;
    width: 12rem;
    height: 2.56rem;
  }
`;

const Signup = styled.div`
  font-size: 1.625rem;
  color: #535353;
  margin: 0px auto;
  margin-bottom: 3rem;
  @media (max-width: 600px) {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
`;

const EmailInput = styled.input`
  font-family: "paybooc-Bold";
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
    font-family: "paybooc-Bold";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
  @media (max-width: 980px) {
    width: 19rem;
  }
  @media (max-width: 768px) {
    width: 19rem;
  }
  @media (max-width: 600px) {
    width: 17rem;
  }
`;

const PwdInput = styled.input`
  font-family: "paybooc-Bold";
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
    font-family: "paybooc-Bold";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
  @media (max-width: 980px) {
    width: 19rem;
  }
  @media (max-width: 768px) {
    width: 19rem;
  }
  @media (max-width: 600px) {
    width: 17rem;
  }
`;

const PwdCheckInput = styled.input`
  font-family: "paybooc-Bold";
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
    font-family: "paybooc-Bold";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
  @media (max-width: 980px) {
    width: 19rem;
  }
  @media (max-width: 768px) {
    width: 19rem;
  }
  @media (max-width: 600px) {
    width: 17rem;
  }
`;

const Input = styled.input`
  font-family: "paybooc-Bold";
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
    font-family: "paybooc-Bold";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
  @media (max-width: 980px) {
    width: 19rem;
  }
  @media (max-width: 768px) {
    width: 19rem;
  }
  @media (max-width: 600px) {
    width: 17rem;
  }
`;

const Button1 = styled.button`
  font-family: "paybooc-Bold";
  width: 24.5rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #2b61e1;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 980px) {
    width: 22rem;
  }
  @media (max-width: 768px) {
    width: 22rem;
  }
  @media (max-width: 600px) {
    width: 20rem;
  }
`;

const Button2 = styled.a`
  font-family: "paybooc-Bold";
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
  text-decoration: none;
  @media (max-width: 980px) {
    width: 22rem;
  }
  @media (max-width: 768px) {
    width: 22rem;
  }
  @media (max-width: 600px) {
    width: 20rem;
  }
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
