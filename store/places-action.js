import * as FileSystem from "expo-file-system";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import { insertPlace, fetchPlaces } from "../helper/db";

export const addPlace = (title, image, lat, lng) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "DUMMY ADDRESS",
        lat,
        lng
      );
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath, lat : lat, lng : lng },
      });
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    const dbResult = await fetchPlaces();
    dispatch({ type: SET_PLACES, places : dbResult.rows._array });
  };
};
