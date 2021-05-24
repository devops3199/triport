import React from "react";
import styled from "styled-components";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  return (
    <ContainerStyles>
      <FillerStyles bgcolor={bgcolor} completed={completed} />
    </ContainerStyles>
  );
};

const ContainerStyles = styled.div`
  height: 0.5rem;
  width: 100%;
  /* background-color: #e0e0de; */
  border-radius: 50px;
  margin: 0 auto;
  margin-top: -0.7rem;
  margin-bottom: 0.2rem;
  z-index: 1;
  opacity: 0.5;
`;

const FillerStyles = styled.div`
  height: 100%;
  width: ${(props) => (isNaN(props.completed) ? "0" : props.completed)}%;
  background-color: #89acff;
  border-radius: inherit;
  text-align: right;
  transition: all 500ms ease-out;
`;

export default ProgressBar;
