import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CustomHeaderButton } from "../components/HeaderButton";

export const PlacesListScreen = (props) => {
  return (
    <View>
      <Text>Places List</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navData.navigation.navigate("NewPlace")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
