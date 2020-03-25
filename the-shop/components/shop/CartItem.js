import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CartItem = ({ quantity, title, amount, deletable, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.defaultText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.defaultText}>${amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color={"#f00"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16
  },
  defaultText: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});
