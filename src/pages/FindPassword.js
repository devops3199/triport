import React from "react";
import styled from "styled-components";

import tripper from "media/image/login_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { history } from "redux/configureStore";

import { actionCreators as userAcitons } from "redux/modules/user";
import Spinner from "shared/Spinner2";

const FindPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.is_loading);

  const findRef = React.useRef();

  const Find = () => {
    console.log(findRef.current.value);
    dispatch(userAcitons.FindPwdDB(findRef.current.value));
  };
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Wrap>
          <Text>비밀번호 찾기</Text>
          <Text2>이메일</Text2>
          <EmailInput placeholder="E-mail" ref={findRef} />
          <Button onClick={Find}>비밀번호 찾기</Button>
          <Text
            login
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인하러 가기
          </Text>
          <Tripper />
        </Wrap>
      )}
    </React.Fragment>
  );
};
export default FindPassword;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px auto;
  margin-top: 20rem;
  width: 23rem;
`;

const Text = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-family: "paybooc-Bold";
  font-size: ${(props) => (props.login ? "1rem" : "1.62rem")};
  width: 23rem;
  margin: 0px auto;
  margin-bottom: 4rem;
  color: ${(props) => (props.login ? "#2B61E1" : "#535353")};
`;

const Text2 = styled.div`
  display: flex;
  align-items: flex-start;
  width: 23rem;
  font-family: "AppleSDGothicNeoR";
  font-size: 0.8rem;
  color: #2b61e1;
  margin-bottom: 0.5rem;
`;

const EmailInput = styled.input`
  font-family: "paybooc-Bold";
  outline: none;
  width: 20rem;
  height: 3rem;
  margin-bottom: 3rem;
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
`;

const Button = styled.button`
  cursor: pointer;
  font-family: "paybooc-Bold";
  font-size: 1rem;
  width: 23.5rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #2b61e1;
  border-radius: 5px;
  margin-bottom: 2rem;
  background-color: #2b61e1;
  color: #ffffff;
`;

const Tripper = styled.div`
  width: 23rem;
  height: 18rem;
  background-image: url("${tripper}");
  background-size: 23rem 20rem;
  position: absolute;
  clip: rect(0, 370px, 240px, 0);
  margin: 0px auto;
  margin-top: 33rem;
`;
