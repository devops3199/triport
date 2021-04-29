import React from "react";
import styled from "styled-components";
import "shared/scss/App.scss";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "redux/configureStore";

import { Main, NotFound, BoardMain } from "pages/pages";
import Snsmain from "pages/SnsMain";
import Header from "components/Header";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Footer from "components/Footer";
import Profile from "pages/Profile";

const App = (props) => {
  return (
    <>
      <Header />
      <MainContainer>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/post" exact component={Snsmain} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/board" exact component={BoardMain} />
            <Route path="/profile" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </MainContainer>
      <Footer/>
    </>
  );
};

const MainContainer = styled.main``;

const FooterContainer = styled.footer`
`;

export default App;
