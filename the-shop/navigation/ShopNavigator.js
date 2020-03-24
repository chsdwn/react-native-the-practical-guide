import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { CartScreen } from "../screens/shop/CartScreen";
import { ProductDetailScreen } from "../screens/shop/ProductDetailScreen";
import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";

import Colors from "../constants/Colors";

export const ProductsNavigator = createAppContainer(
  createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen,
      ProductDetail: ProductDetailScreen,
      Cart: CartScreen
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
        headerTitleStyle: {
          fontFamily: "open-sans-bold"
        },
        // Effects iOS title
        headerBackTitleStyle: {
          fontFamily: "open-sans-bold"
        }
      }
    }
  )
);
