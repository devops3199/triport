import React from "react";
import styled from "styled-components";
import "shared/scss/App.scss";

import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { history } from "redux/configureStore";

import {
  NotFound,
  BoardMain,
  BoardWrite,
  BoardDetail,
  About,
} from "pages/pages";

import Header from "components/Header";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Footer from "components/Footer";
import Profile from "pages/Profile";
import Trils from "pages/Trils";
import TrilsWrite from "pages/TrilsWrite";
import FindPassword from "pages/FindPassword";
import TrillsSearch from "pages/TrilsSearch";
import TrillsDetail from "components/trils/TrilsDetailM";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as profileActions } from "redux/modules/profile";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import OAuth2LogoutHandler from "./OAuth2LogoutHandler";
import TrilsDetailTutorialM from "components/trils/TrilsDetailTutorialM";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB()); // 로그인 여부 체크
    dispatch(profileActions.getProfile());
  }, []);

  return (
    <>
      <Header history={history} />
      <MainContainer>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Trils} />
            <Route path="/search" exact component={TrillsSearch} />
            {/* <Route path="/post" exact component={Snsmain} /> */}
            <Route path="/trils/write" exact component={TrilsWrite} />
            <Route path="/find" exact component={FindPassword} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/trilog" exact component={BoardMain} />
            <Route path="/trilog/write" exact component={BoardWrite} />
            <Route path="/trilog/write/:id" exact component={BoardWrite} />
            <Route path="/trilog/:id" exact component={BoardDetail} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/about" exact component={About} />
            <Route path="/trils/detail/:id" exact component={TrillsDetail} />
            <Route
              path="/trils/tutorial"
              exact
              component={TrilsDetailTutorialM}
            />
            <Route
              path="/auth/kakao/callback"
              exact
              component={OAuth2RedirectHandler}
            />
            <Route path="/auth/logout" exact component={OAuth2LogoutHandler} />
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
