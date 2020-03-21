import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const MealItem = ({
  title,
  duration,
  complexity,
  affordability,
  image,
  onSelectMeal
}) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground source={{ uri: image }} style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text>{duration}m</Text>
            <Text>{complexity.toUpperCase()}</Text>
            <Text>{affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#dedede",
    marginVertical: 10,
    borderRadius: 5,
    overflow: "hidden"
  },
  mealRow: { flexDirection: "row" },
  mealHeader: { height: "85%" },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  titleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingVertical: 5
  },
  title: {
    color: "#fff",
    fontFamily: "open-sans-bold",
    fontSize: 18,
    textAlign: "center"
  }
});
