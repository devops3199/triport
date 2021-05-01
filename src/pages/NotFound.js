import React from "react";
import styled from "styled-components";

import signuplogo from "media/image/triport_airplane.png";

const NotFound = (props) => {
  return (
    <React.Fragment>
      <Wrap>
        <SmallWrap>
          <Image />
          <Text>존재하지 않는 페이지입니다.</Text>
        </SmallWrap>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  width: 58rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0px auto;
  font-family: "TTTogether";
`;

const SmallWrap = styled.div`
  width: 30rem;
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

const Text = styled.p`
  font-size: 2rem;
`;

export default NotFound;
