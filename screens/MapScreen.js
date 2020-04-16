import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRegion = {
    latitude: 18.51957,
    longitude: 73.85535,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoords;
  if (selectedLocation) {
    markerCoords = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={savePickedLocation}
        >
          <Text style={styles.headerButtonText}>SAVE</Text>
        </TouchableOpacity>
      ),
    });
  });

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("Pick Location");
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  return (
    <MapView
      region={mapRegion}
      onPress={selectLocationHandler}
      style={{ flex: 1 }}
    >
      {markerCoords && (
        <Marker title="Picked Location" coordinate={markerCoords}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  headerButtonText: {
    marginHorizontal: 20,
    color: "white",
  },
  headerButton: {
    fontSize: 16,
  },
});

export default MapScreen;
