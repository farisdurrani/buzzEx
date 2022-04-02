import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

/* 
Multi-use map component. Pass in center point of map view in mapProps. Map dimensions in style

Prop format below:
props = {
  mapProps: {
    latitude,
    longitude,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    style
  },
} */
const MapComponent = (props) => {
  const {latitude, longitude, LATITUDE_DELTA, LONGITUDE_DELTA, style} = props.mapProps;

  return (
    <MapView
      style={style}
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