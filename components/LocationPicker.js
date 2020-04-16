import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setisFetching] = useState();
  const pickedLocationParams = props.params.params;

  useEffect(() => {
    console.log(pickedLocationParams);
    if (pickedLocationParams) {
      console.log("1");

      setPickedLocation(pickedLocationParams.pickedLocation);
    }
  }, []);
  const verifyPermission = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert("Insufficient Permissions", [{ text: "Okay" }]);
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPerm = await verifyPermission();
    if (!hasPerm) {
      Alert.alert("Please Grant Permission to Continue");
      return;
    }
    try {
      setisFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      setisFetching(false);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could not Fetch Location");
      return;
    }
  };
  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.locationPreview}>
        {isFetching && <ActivityIndicator size="large" />}
        {pickedLocation ? (
          <Text>
            {pickedLocation.lat}, {pickedLocation.lng}
          </Text>
        ) : (
          <Text>No Location Picked</Text>
        )}
      </View>
      <View style={{ margin: 5 }}>
        <Button title="Get User Location" onPress={getLocationHandler} />
      </View>
      <View style={{ margin: 5 }}>
        <Button title="Pick On Map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  locationPreview: {
    marginBottom: 10,
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LocationPicker;
