import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { addToCart } from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

import { ProductItem } from "../../components/shop/ProductItem";
import { CustomHeaderButton } from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

export const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const products = useSelector(state => state.products.availableProducts);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          color={Colors.primary}
          title="Try again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
