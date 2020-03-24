import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";

import Colors from "../../constants/Colors";

export const ProductItem = ({
  image,
  title,
  price,
  onViewDetail,
  onAddToCart
}) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <TouchableComponent onPress={onViewDetail}>
        <View>
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
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={onAddToCart}
            />
          </View>
        </View>
      </TouchableComponent>
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
    marginVertical: 2,
    fontFamily: "open-sans-bold"
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans"
  },
  buttonContainer: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  }
});