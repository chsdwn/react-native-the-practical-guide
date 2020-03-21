import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const MealDetailScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Meal Detail</Text>
      <Button
        title="Go back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
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
