import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Wrap>푸터</Wrap>;
};

const Wrap = styled.footer`
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 50px;
  width: 100%;
  margin: 0 auto;
  background: #89ACFF;
  color: white;
  text-align: center;
`;

export default Footer;
