import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { TitleText } from "../components/TitleText";

import Colors from "../constants/colors";

export const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
    borderBottomWidth: Platform.OS === "ios" ? 1 : 0
  },
  headerIOS: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  title: {
    color: Platform.OS === "ios" ? Colors.primary : "#fff"
  }
});
