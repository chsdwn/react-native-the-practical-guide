import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { ProductDetailScreen } from "../screens/shop/ProductDetailScreen";
import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";

import Colors from "../constants/Colors";

export const ProductsNavigator = createAppContainer(
  createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen,
      ProductDetail: ProductDetailScreen
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
