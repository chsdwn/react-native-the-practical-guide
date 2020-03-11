import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback, // Works only on Android
  TouchableWithoutFeedback,
  View
} from "react-native";

export const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete} activeOpacity={0.8}>
      <View style={styles.listItem} onTouchEnd>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "#000",
    borderWidth: 1
  }
});
