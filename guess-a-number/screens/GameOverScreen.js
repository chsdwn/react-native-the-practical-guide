import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Gameover</Text>
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
