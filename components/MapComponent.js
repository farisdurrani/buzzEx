import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

/* 
Multi-use map component. Pass in center point of map view in locationProps. Map dimensions in style

Prop format below:
props = {
  locationProps: {
    latitude,
    longitude,
    LATITUDE_DELTA,
    LONGITUDE_DELTA
  },
  style
} */
const MapComponent = (props) => {
  const {latitude, longitude, LATITUDE_DELTA, LONGITUDE_DELTA} = props.locationProps;

  return (
    <MapView
      style={props.style}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }}
    />
  )
};

export default MapComponent;