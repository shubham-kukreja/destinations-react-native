import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

import * as placesAction from "../store/places-action";
import { useDispatch } from "react-redux";

import ImagePicker from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();
  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };
  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(titleValue, selectedImage, location.lat, location.lng));
    props.navigation.navigate("Places");
  };
  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  const locationPickedHandler = (location) => {
    setLocation(location);
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onPickedLocation={locationPickedHandler}
          pickedLocation={props.route.params.pickedLocation}
        />
        <Button
          title="Save"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textinput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
