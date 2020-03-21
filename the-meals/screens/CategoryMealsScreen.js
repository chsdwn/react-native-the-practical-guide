import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { CATEGORIES } from "../data/dummy-data";

export const CategoryMealsScreen = props => {
  const navigateToMealDetailScreen = () => {
    props.navigation.navigate("MealDetail");
  };

  const categoryId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    category => category.id === categoryId
  );

  return (
    <View style={styles.screen}>
      <Text>Category Meals</Text>
      <Text>{selectedCategory.title}</Text>
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
