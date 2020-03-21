import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { MealsNavigator } from "./navigation/MealsNavigator";

// Improves performance
enableScreens();

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <MealsNavigator />;
}
