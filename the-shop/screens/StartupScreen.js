import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";
import { useDispatch } from "react-redux";

import { authenticate } from "../store/actions/auth";

import Colors from "../constants/Colors";

export const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticate(userId, token, expirationTime));
      props.navigation.navigate("Shop");
    };

    tryLogin();
    dispatch(authenticate());
  }, []);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
