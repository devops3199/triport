import React from "react";
import styled from "styled-components";

import logo from "media/svg/triport_logo_white.svg";

const Footer = () => {
  return (
    <Wrap>
      <LogoContainer>
        <Logo />
      </LogoContainer>
    </Wrap>
  );
};

const Wrap = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0px;
  bottom: 0px;
  height: 50px;
  width: 100vw;
  background: #89acff;
  color: white;
  z-index: 99;
`;

const Logo = styled.div`
  width: 7.5rem;
  height: 2.5rem;
  background-image: url("${logo}");
  background-size: 7.5rem 2.5rem;
`;

const LogoContainer = styled.div`
  width: 100vw;
  margin-left: 2rem;
`;

export default Footer;
