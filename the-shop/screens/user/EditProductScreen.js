import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { createProduct, updateProduct } from "../../store/actions/products";

import { CustomHeaderButton } from "../../components/UI/HeaderButton";
import { Input } from "../../components/UI/Input";

import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

export const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const productId = props.route.params ? props.route.params.productId : null;
  const product = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageURL: product ? product.imageUrl : "",
      price: "",
      description: product ? product.description : ""
    },
    inputValidities: {
      title: product ? true : false,
      imageURL: product ? true : false,
      price: product ? true : false,
      description: product ? true : false
    },
    formIsValid: product ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [
        {
          text: "Okay"
        }
      ]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Check your form", [{ text: "Okay" }]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (product) {
        await dispatch(
          updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageURL
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageURL,
            +formState.inputValues.price
          )
        );
      }

      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [
    formState.formIsValid,
    dispatch,
    productId,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageURL,
    formState.inputValues.price
  ]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Title cannot be empty"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.title : ""}
            initiallyValid={!!product}
            required
          />
          <Input
            id="imageURL"
            label="Image Url"
            errorText="Enter a valid image url"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={product ? product.imageUrl : ""}
            initiallyValid={!!product}
            required
          />
          {!productId && (
            <Input
              id="price"
              label="Price"
              errorText="Price cannot be empty"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Description cannot be empty"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            // Doesn't work on iOS
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={product ? product.description : ""}
            initiallyValid={!!product}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const editProductScreenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};

  return {
    headerTitle: routeParams.productId ? "Edit Product" : "Add Product"
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
