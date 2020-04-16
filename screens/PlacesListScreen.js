import React, { useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderButton from "../UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import PlaceItem from "../components/PlaceItem";
import * as placesAction from "../store/places-action";

const PlacesListScreen = (props) => {
  // Navigation Header
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={"ios-add"}
            onPress={() => {
              props.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesAction.loadPlaces());
  }, [dispatch]);
  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() =>
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
