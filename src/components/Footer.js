import React from "react";
import styled from "styled-components";

import logo from "media/svg/triport_logo_white.svg";

const Footer = () => {
  return (
    <Wrap>
      <Logo />
    </Wrap>
  );
};

const Wrap = styled.footer`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 50px;
  width: 100%;
  background: #89acff;
  color: white;
  z-index:99;
`;

const Logo = styled.div`
  width: 7.5rem;
  height: 2.5rem;
  background-image: url("${logo}");
  background-size: 7.5rem 2.5rem;
  margin-left: 22rem;
`;

export default Footer;
