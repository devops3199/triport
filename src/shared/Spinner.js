import React from "react";
import styled from "styled-components";

function Spinner() {
  return (
    <Wrap width={window.innerWidth} height={window.innerHeight}>
      <SpinnerImg />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: black;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0);
`;

const SpinnerImg = styled.div`
  display: inline-block;
  position: fixed;
  top: 50%;
  &::after {
    content: "";
    display: block;
    width: 70px;
    height: 70px;
    margin: 8px;
    border-radius: 50%;
    border: 4px solid #89acff;
    border-color: #89acff transparent #89acff transparent;
    animation: Spinner 1.2s linear infinite;
  }
  @keyframes Spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
