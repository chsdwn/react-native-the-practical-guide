import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FiltersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Filters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
