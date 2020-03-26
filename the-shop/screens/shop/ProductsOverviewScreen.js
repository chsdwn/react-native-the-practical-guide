import React, { useEffect } from "react";
import { Button, FlatList, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

export const ProductsOverviewScreen = props => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.availableProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={itemData => (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() =>
                selectItemHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => dispatch(addToCart(itemData.item))}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee"
  }
});
