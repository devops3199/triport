import React from "react";
import styled from "styled-components";

function Spinner() {
  return (
    <Wrap>
      <SpinnerImg />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  width: 1280px;
  height: 100%;
`;

const SpinnerImg = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: fixed;
  top: 50%;
  left: 46%;
  &::after {
    content: "";
    display: block;
    width: 70px;
    height: 70px;
    margin: 8px;
    border-radius: 50%;
    border: 4px solid #e5dada;
    border-color: #e5dada transparent #e5dada transparent;
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
