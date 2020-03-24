import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../store/actions/cart";

import { ProductItem } from "../../components/shop/ProductItem";

export const ProductsOverviewScreen = props => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.availableProducts);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={itemData => (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onViewDetail={() =>
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title
              })
            }
            onAddToCart={() => {
              dispatch(addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee"
  }
});
