import React from "react";
import styled from "styled-components";

const Role = () => {
  return (
    <React.Fragment>
      <Wrap>
        <div>트레블 에디터</div>
        <div>트레블러</div>
      </Wrap>
    </React.Fragment>
  );
};

export default Role;

const Wrap = styled.div`
  width: 23rem;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0px auto;
  margin-bottom: 1rem;
`;
