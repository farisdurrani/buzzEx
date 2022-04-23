import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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
  const {source, dest, LATITUDE_DELTA, LONGITUDE_DELTA, style} = props.mapProps;
  const {sourceLat, sourceLong} = source;
  const {destLat, destLong} = dest;
  // console.log(sourceLat, sourceLong)
  // console.log(destLat, destLong)

  return (
    <MapView
      style={style}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: (sourceLat + destLat) / 2,
        longitude: (sourceLong + destLong) / 2,
        latitudeDelta: Math.abs(sourceLat - destLat),
        longitudeDelta: Math.abs(sourceLong - destLong)
      }}
    >
      <Marker
        key={0}
        coordinate={{ latitude : sourceLat , longitude : sourceLong }}
        title={"Deliverer"}
        description={"Deliverer Location"}
      />
      <Marker
        key={1}
        coordinate={{ latitude :  destLat, longitude : destLong}}
        title={"Pickup/Dropoff"}
        description={"Pickup/Dropoff Location"}
      />
    </MapView>
  )
};

export default MapComponent;