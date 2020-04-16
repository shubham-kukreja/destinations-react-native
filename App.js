import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MainNavigator } from "./navigation/PlacesNavigator";

import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import placesReducer from "./store/places-reducer";

import { init } from "./helper/db";

init()
  .then(() => {
    console.log("Initialized Database");
  })
  .catch((err) => {
    console.log("Failed", err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
