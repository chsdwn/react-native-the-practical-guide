import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const CategoriesScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Categories</Text>
      <Button
        title="Go to Meals"
        onPress={() => {
          props.navigation.navigate({ routeName: "CategoryMeals" });
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
