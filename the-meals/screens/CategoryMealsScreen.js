import React from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

import { CATEGORIES } from "../data/dummy-data";

import Colors from "../constants/Colors";

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

CategoryMealsScreen.navigationOptions = navigationData => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(
    category => category.id === categoryId
  );

  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
    },
    headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
