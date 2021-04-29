import SnsPost from "components/SnsPost";
import React, { Fragment } from "react";
import styled from "styled-components";

const Snsmain = () => {
  return (
    <Fragment>
      <PostLine>
        <SnsPost margin />
        <SnsPost />
        <SnsPost />
      </PostLine>
      <PostLine>
        <SnsPost margin/>
        <SnsPost />
        <SnsPost />
      </PostLine>
    </Fragment>
  );
};

const PostLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 1280px;
  margin: 0px auto;
  margin-bottom: 70px;
`;

export default Snsmain;
