import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';
import MapComponent from "../components/MapComponent";

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
} from "react-native";


let {width, height} = Dimensions.get('window') //Screen dimensions
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.04  // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO // Dependent on LATITUDE_DELTA


const MapScreen = ({ navigation }) => {
  const [initLocation, setInitLocation] = useState({latitude:0, longitude:0, latitudeDelta:LATITUDE_DELTA, longitudeDelta:LONGITUDE_DELTA});
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Getting Current Location..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const locationProps = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    LATITUDE_DELTA: LATITUDE_DELTA, 
    LONGITUDE_DELTA: LONGITUDE_DELTA
  } : null
  return (
    <View style={styles.container}>
      {location ? 
      <MapComponent locationProps={locationProps} style={styles.map}/>
      : <Text style={styles.paragraph}>Waiting for location data</Text>}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: width/4,
    bottom: width/4
  }
});

