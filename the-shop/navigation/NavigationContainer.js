import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import { MainNavigator } from "./ShopNavigator";

export const NavigationContainer = props => {
  const navigationRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navigationRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <MainNavigator ref={navigationRef} />;
};
