import React from "react";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { logout } from "../store/actions/auth";

import { StartupScreen } from "../screens/StartupScreen";
import { CartScreen } from "../screens/shop/CartScreen";
import { OrdersScreen } from "../screens/shop/OrdersScreen";
import { ProductDetailScreen } from "../screens/shop/ProductDetailScreen";
import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";
import { AuthScreen } from "../screens/user/AuthScreen";
import { EditProductScreen } from "../screens/user/EditProductScreen";
import { UserProductsScreen } from "../screens/user/UserProductsScreen";

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

const ProductsNavigator = createStackNavigator(
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

const OrdersNavigator = createStackNavigator(
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

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout);
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  { defaultNavigationOptions: defaultNavOptions }
);

export const MainNavigator = createAppContainer(
  createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
  })
);
