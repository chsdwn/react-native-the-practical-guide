import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  View,
  Text
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { MapPreview } from "./MapPreview";

import Colors from "../constants/Colors";

export const LocationPicker = props => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHanlder = async () => {
    if (await verifyPermissions()) {
      try {
        setIsFetching(true);

        const location = await Location.getCurrentPositionAsync({
          timeout: 5000
        });

        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      } catch (err) {
        Alert.alert(
          "Could not fetch location",
          "Please try again or pick a location on the map",
          [{ text: "Okay" }]
        );
      } finally {
        setIsFetching(false);
      }
    } else {
      return;
    }
  };

  return (
    <View syle={styles.locationPicker}>
      <MapPreview location={pickedLocation} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen.</Text>
        )}
      </MapPreview>
      <Button
        title="Get Location"
        color={Colors.primary}
        onPress={getLocationHanlder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1
  }
});
