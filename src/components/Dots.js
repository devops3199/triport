import React from "react";
import styled from "styled-components";

const Dots = ({ slides, activeIndex }) => (
  <DotDiv>
    {slides.map((slide, i) => (
      <Dot key={slide} active={activeIndex === i} />
    ))}
  </DotDiv>
);

const DotDiv = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.span`
  padding: 3px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => (props.active ? "black" : "white")};
`;

export default Dots;
