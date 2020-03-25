import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from "react-native";

import { Card } from "../UI/Card";

export const ProductItem = ({ children, image, title, price, onSelect }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View>
        <TouchableComponent onPress={onSelect}>
          <View>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "60%"
  },
  details: {
    alignItems: "center",
    height: "17%",
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
    height: "23%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  }
});
