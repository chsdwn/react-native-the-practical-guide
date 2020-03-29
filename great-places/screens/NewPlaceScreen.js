import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useDispatch } from "react-redux";

import { addPlace } from "../store/places-actions";

import { ImgPicker } from "../components/ImgPicker";

import Colors from "../constants/Colors";

export const NewPlaceScreen = props => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const titleChangeHandler = text => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    console.log(title);
    dispatch(addPlace(title));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImgPicker />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place"
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});
