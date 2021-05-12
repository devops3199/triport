import React from "react";
import styled from "styled-components";
import "shared/scss/App.scss";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { history } from "redux/configureStore";

import { NotFound, BoardMain, BoardWrite, BoardDetail } from "pages/pages";

import Snsmain from "pages/SnsMain";
import Header from "components/Header";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Footer from "components/Footer";
import Profile from "pages/Profile";
import Trils from "pages/Trils";
import SnsWrite from "pages/SnsWrite";
import FindPassword from "pages/FindPassword";
import TrillsSearch from "pages/TrilsSearch";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Trils} />
            <Route path="/search" exact component={TrillsSearch} />
            {/* <Route path="/post" exact component={Snsmain} /> */}
            <Route path="/trils/write" exact component={SnsWrite} />
            <Route path="/find" exact component={FindPassword} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/trilog" exact component={BoardMain} />
            <Route path="/trilog/write" exact component={BoardWrite} />
            <Route path="/trilog/write/:id" exact component={BoardWrite} />
            <Route path="/trilog/:id" exact component={BoardDetail} />
            <Route path="/profile" exact component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </MainContainer>
      <Footer />
    </>
  );
};

const MainContainer = styled.main`
  position: relative;
  bottom: 50px;
`;

const FooterContainer = styled.footer``;

export default App;
