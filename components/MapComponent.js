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
  console.log(sourceLat, sourceLong)


  return (
    <MapView
      style={style}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: sourceLat,
        longitude: sourceLong,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
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
        coordinate={{ latitude :  sourceLat + .001 , longitude : sourceLong + .001}}
        title={"Pickup/Dropoff"}
        description={"Pickup/Dropoff Location"}
      />
    </MapView>
  )
};

export default MapComponent;