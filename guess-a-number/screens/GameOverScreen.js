import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";

import { BodyText } from "../components/BodyText";
import { TitleText } from "../components/TitleText";

export const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Gameover</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require("../assets/success.png")}
          source={{
            uri:
              "https://cdn.pixabay.com/photo/2014/06/27/12/36/fish-378286_960_720.jpg"
          }}
          fadeDuration={1000}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: "#000",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
