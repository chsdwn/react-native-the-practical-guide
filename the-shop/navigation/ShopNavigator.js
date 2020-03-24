import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { CartScreen } from "../screens/shop/CartScreen";
import { OrdersScreen } from "../screens/shop/OrdersScreen";
import { ProductDetailScreen } from "../screens/shop/ProductDetailScreen";
import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
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
};

export const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

export const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

export const ShopNavigator = createAppContainer(
  createDrawerNavigator(
    {
      Products: ProductsNavigator,
      Orders: OrdersNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      }
    }
  )
);
