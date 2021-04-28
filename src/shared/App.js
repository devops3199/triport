import React from "react";
import styled from "styled-components";
import "shared/scss/App.scss";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "redux/configureStore";

import { Main, NotFound } from "pages/pages";
import Snsmain from "pages/SnsMain";

const App = (props) => {
  return (
    <>
      <HeaderContainer>해더</HeaderContainer>
      <MainContainer>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/post" exact component={Snsmain} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </MainContainer>
      <FooterContainer>풋터</FooterContainer>
    </>
  );
};

const HeaderContainer = styled.header``;

const MainContainer = styled.main``;

const FooterContainer = styled.main``;

export default App;
