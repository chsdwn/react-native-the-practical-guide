import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const CategoryMealsScreen = props => {
  const navigateToMealDetailScreen = () => {
    props.navigation.navigate("MealDetail");
  };

  return (
    <View style={styles.screen}>
      <Text>Category Meals</Text>
      <Button title="Go to Meal Detail" onPress={navigateToMealDetailScreen} />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.goBack();
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
