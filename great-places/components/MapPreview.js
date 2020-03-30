import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GOOGLE_MAPS_API_KEY } from "../constants/ApiKey";

export const MapPreview = ({ children, location, onPress, style }) => {
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl =
      `https://maps.googleapis.com/maps/api/staticmap?` +
      `center=${location.lat},${location.lng}&` +
      `zoom=14&size=400x200&maptype=roadmap&` +
      `markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&` +
      `key=${GOOGLE_MAPS_API_KEY}`;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center"
  },
  mapImage: {
    width: "100%",
    height: "100%"
  }
});
