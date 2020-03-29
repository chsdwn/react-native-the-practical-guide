import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const PlaceDetailScreen = props => {
  return (
    <View>
      <Text>Place Detail</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle")
  };
};

const styles = StyleSheet.create({});
