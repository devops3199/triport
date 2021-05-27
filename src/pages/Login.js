import React, { useEffect, useState } from "react";
import styled from "styled-components";

import loginlogo from "media/image/login_logo.png";
import kakaoicon from "media/svg/kakao_symbol.svg";
import { emailCheck, pwdCheck } from "../shared/common";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { actionCreators as userAcitons } from "redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [line1, setLine1] = useState("1px solid #707070");
  const [line2, setLine2] = useState("1px solid #707070");
  // 카카오 로그인 Redirect_url
  const KAKAO_URL =
    "https://kauth.kakao.com/oauth/authorize?client_id=b30e166ade03d146889e1b012679fcf6&redirect_uri=https://triport.kr/auth/kakao/callback&response_type=code";
  // "https://kauth.kakao.com/oauth/authorize?client_id=b30e166ade03d146889e1b012679fcf6&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code";

  const login = () => {
    if (email === "" || pwd === "") {
      Swal.fire({
        title: "로그인 정보를 모두 입력해주세요.",
        icon: "warning",
      });
      return;
    }
    dispatch(userAcitons.loginDB(email, pwd));
  };
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
  return (
    <React.Fragment>
      <Wrap>
        <Image />
        <LoginDiv>LOGIN</LoginDiv>
        <EmailInput
          line={line1}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="E-MAIL"
        ></EmailInput>
        <PwdInput
          line={line2}
          placeholder="PASSWORD"
          type="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          onKeyPress={() => {
            if (window.event.keyCode === 13) {
              login();
            }
          }}
        ></PwdInput>
        <Button1 onClick={login}>LOGIN</Button1>
        {/* 카카오 로그인 URL 이동 -> OAuth2RedirectHandler 컴포넌트 로드 */}
        <Button2 href={KAKAO_URL}>
          <Kakao />
          카카오톡 LOGIN
        </Button2>
        <Text href="/signup">회원가입</Text>
        <Text href="/find">비밀번호 찾기</Text>
      </Wrap>
    </React.Fragment>
  );
};
export default Login;

const Wrap = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  font-family: "paybooc-Bold";
`;
const Image = styled.div`
  background-image: url("${loginlogo}");
  background-size: 23rem 18.75rem;
  width: 23rem;
  height: 18.75rem;
  @media (max-width: 600px) {
    background-size: 18rem 15rem;
    width: 18rem;
    height: 15rem;
  }
`;
const LoginDiv = styled.div`
  display: flex;
  font-size: 1.625rem;
  width: 22rem;
  margin: 0px auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: 1.2rem;
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
  @media (max-width: 600px) {
    width: 17rem;
  }
`;
const Button1 = styled.button`
  font-size: 1rem;
  cursor: pointer;
  font-family: "paybooc-Bold";
  width: 24.5rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-bottom: 2rem;
  background-color: #2b61e1;
  color: #ffffff;
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
  margin-bottom: 2rem;
  background-color: #ffe600;
  font-size: 1rem;
  color: #2b1718;
  text-decoration: none;
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
  width: 24.5rem;
  text-decoration: none;
  font-family: "AppleSDGothicNeoR";
  color: #5a5a5a;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
