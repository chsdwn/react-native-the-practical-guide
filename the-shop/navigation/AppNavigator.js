import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CartScreen } from "../screens/shop/CartScreen";
import { ProductDetailScreen } from "../screens/shop/ProductDetailScreen";
import { ProductsOverviewScreen } from "../screens/shop/ProductsOverviewScreen";

const StackNavigator = createStackNavigator();

export const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
        <StackNavigator.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
        />
        <StackNavigator.Screen
          name="Cart"
          component={CartScreen}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
