import React from "react";
import { StyleSheet, View } from "react-native";

export const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // iOS shadow
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // Android shadow
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10
  }
});
