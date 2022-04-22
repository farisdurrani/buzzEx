import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";
import * as Location from "expo-location";

let { width, height } = Dimensions.get("window"); //Screen dimensions
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04; // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // Dependent on LATITUDE_DELTA

const SellerAcceptedScreen = ({ navigation, route }) => {
  const { deliveryItem } = route.params;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { destination_address, source_address } = deliveryItem.data;

  const [sourceLat, sourceLong] = [
    source_address.address.address_coord.latitude,
    source_address.address.address_coord.longitude,
  ];
  const [destinationLat, destinationLong] = [
    destination_address.address.address_coord.latitude,
    destination_address.address.address_coord.longitude,
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Getting Current Location..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const mapProps = location
    ? {
        source: { sourceLat: sourceLat, sourceLong: sourceLong },
        dest: { destLat: destinationLat, destLong: destinationLong },
        LATITUDE_DELTA: LATITUDE_DELTA,
        LONGITUDE_DELTA: LONGITUDE_DELTA,
        style: styles.map,
      }
    : null;
  console.log(mapProps);

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <Text style={styles.mainText}>Dan will be delivering your package!</Text>

      <Image
        source={require("../../assets/earth_face.png")}
        style={styles.profilePic}
      />
      <View style={[LAYOUT.centerMiddle]}>
        <Text style={styles.name}>Dan Deliverer</Text>
        <Text style={styles.username}>@danTheDeliverer</Text>
      </View>

      <View style={[LAYOUT.row, { marginTop: 10 }]}>
        <AntDesign name="star" size={20} color={COLORS.primary_red} />
        <Text> 4.41</Text>
      </View>

      <View style={{ marginTop: 60 }}>
        {location ? (
          <BButton
            text="Continue"
            onPress={() => {
              navigation.navigate("DelivererToPickup", {
                mapProps: mapProps,
              });
            }}
          />
        ) : (
          <Text> Loading location data...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  upperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  mainText: {
    marginTop: 50,
    fontSize: 40,
    textAlign: "center",
  },
  profilePic: {
    marginTop: 50,
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  name: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    color: COLORS.primary_red,
  },
});

export default SellerAcceptedScreen;
