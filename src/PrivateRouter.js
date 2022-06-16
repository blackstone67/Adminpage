import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { checkToken } from "../src/Redux/Actions/userActions";

function PrivateRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken(userInfo))
  },[userInfo,dispatch]);
  
  return (
    <Route
      {...rest}
      component={(props) => {
        if (userInfo && userInfo.isAdmin) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
  );
}

export default PrivateRouter;
