import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/Colors";

export const ProductItem = ({
  image,
  title,
  price,
  onViewDetail,
  onAddToCart
}) => {
  return (
    <View style={styles.product}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={onViewDetail}
        />
        <Button color={Colors.primary} title="To Cart" onPress={onAddToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 300,
    margin: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd"
  },
  image: {
    width: "100%",
    height: "60%"
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: "#888"
  },
  buttonContainer: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  }
});
