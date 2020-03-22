import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CategoryMealsScreen } from "../screens/CategoryMealsScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { MealDetailScreen } from "../screens/MealDetailScreen";

import Colors from "../constants/Colors";

export const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories"
      }
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
      },
      headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primaryColor
    }
  }
);

export const MealsFavTabNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Meals: {
        screen: MealsNavigator,
        navigationOptions: {
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={25}
                color={tabInfo.tintColor}
              />
            );
          }
        }
      },
      Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
          tabBarLabel: "Favourites!",
          tabBarIcon: tabInfo => {
            return (
              <Ionicons
                name="ios-star"
                size={25}
                color={tabInfo.tintColor}
              />
            );
          }
        }
      }
    },
    {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    }
  )
);
