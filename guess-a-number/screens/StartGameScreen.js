import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { Card } from "../components/Card";
import { Input } from "../components/Input";

import Colors from "../constants/colors";

export const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  return (
    <TouchableWithoutFeedback
      // Closes keyboard when user touch any blank area.
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={2}
            // Android
            value={enteredValue}
            onChangeText={numberInputHandler}
            // Works on iOS
            keyboardType="number-pad"
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                style={styles.button}
                color={Colors.accent}
                title="Reset"
                onPress={() => {}}
              />
            </View>
            <View style={styles.button}>
              <Button
                style={styles.button}
                color={Colors.primary}
                title="Confirm"
                onPress={() => {}}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: "40%"
  }
});
