import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";

import Colors from "../constants/Colors";

export const ProductsNavigator = createAppContainer(
  createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary
      }
    }
  )
);
