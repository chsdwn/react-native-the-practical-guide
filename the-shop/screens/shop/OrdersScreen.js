import React from "react";
import { FlatList, Platform, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { OrderItem } from "../../components/shop/OrderItem";

export const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};
