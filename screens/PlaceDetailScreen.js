import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const PlaceDetailScreen = (props) => {
  const { placeTitle, placeImg, placeLat, placeLng } = props.route.params;
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Text>{placeTitle}</Text>
      <Image source={{ uri: placeImg }} style={styles.image} />
      <View style={styles.locationContainer}>
        <Text style={styles.address}>{placeLat}</Text>
        <Text style={styles.address}>{placeLng}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
