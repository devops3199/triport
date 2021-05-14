import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "./Spinner2";
import { history } from "redux/configureStore";

const OAuth2LogoutHandler = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.kakaoLogout());
    dispatch(userActions.logout());
    history.replace("/");
  }, []);

  return <Spinner />;
};

export default OAuth2LogoutHandler;
