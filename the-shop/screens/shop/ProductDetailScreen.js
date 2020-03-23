import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSelector } from "react-redux";

export const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId)
  );

  return (
    <View>
      <Text>{selectedProduct.description}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

const styles = StyleSheet.create({});
