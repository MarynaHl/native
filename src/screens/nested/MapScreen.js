import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          longitude: longitude,
          latitude: latitude,
          longitudeDelta: 0.006,
          latitudeDelta: 0.001,
        }}
      >
        <Marker
          coordinate={{
            longitude: longitude,
            latitude: latitude,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
