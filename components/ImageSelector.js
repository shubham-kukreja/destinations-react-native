import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert("Insufficient Permissions", [{ text: "Okay" }]);
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPerm = await verifyPermission;
    if (!hasPerm) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <Text>No Image Picked</Text>
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom : 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom : 15
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImgPicker;
