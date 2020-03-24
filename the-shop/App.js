import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import cartReducer from "./store/reducers/cart";
import productsReducer from "./store/reducers/products";
import { ProductsNavigator as ShopNavigator } from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = async () => {
  return await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
