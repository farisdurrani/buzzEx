import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import MapComponent from "../../components/MapComponent";
import { unsubscribeDeliveryJob } from "../../firebase";

let { width, height } = Dimensions.get("window"); //Screen dimensions
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04; // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // Dependent on LATITUDE_DELTA

const MatchingDeliverer = ({ navigation, route }) => {
  const { initPackageItem, senderItem, receiverItem } = route.params;

  const [packageItem, setPackageItem] = useState(initPackageItem);
  const [unsubscribe, setUnsubscribe] = useState(() => () => {});

  const source_address = packageItem.data.source_address;
  const destination_address = packageItem.data.destination_address;
  const [sourceLat, sourceLong] = [
    source_address.address_coord.latitude,
    source_address.address_coord.longitude,
  ];
  const [destinationLat, destinationLong] = [
    destination_address.address_coord.latitude,
    destination_address.address_coord.longitude,
  ];
  const hasLocationData = destination_address && source_address;
  const mapProps = hasLocationData
    ? {
        source: { sourceLat: sourceLat, sourceLong: sourceLong },
        dest: { destLat: destinationLat, destLong: destinationLong },
        LATITUDE_DELTA: LATITUDE_DELTA,
        LONGITUDE_DELTA: LONGITUDE_DELTA,
        style: styles.map,
      }
    : null;

  useEffect(async () => {
    const unsubscribe = unsubscribeDeliveryJob(
      initPackageItem.id,
      setPackageItem
    );
    setUnsubscribe(() => unsubscribe);
  }, [])

  useEffect(() => {
    if (packageItem.data.status >= 2) {
      unsubscribe();
      navigation.replace("Accepted", {
        senderItem: senderItem,
        receiverItem: receiverItem,
        packageItem: packageItem,
      });
    }
  }, [packageItem]);

  return (
    <View style={styles.container}>
      <View style={styles.topleftbutton}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.toprightbutton}>
        <TouchableOpacity onPress={() => navigation.navigate("Cancellation")}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.heading}>
        <Text style={styles.lineone}> Matching Deliverer...</Text>
      </View>

      {hasLocationData ? (
        <MapComponent mapProps={mapProps} />
      ) : (
        <Text style={styles.paragraph}>Loading Map...</Text>
      )}
      <View style={styles.buttonView}>
        <BButton
          text="Go to deliverer pickup screen"
          onPress={() =>
            navigation.navigate("Accepted", {
              packageItem: packageItem,
              senderItem: senderItem,
              receiverItem: receiverItem,
            })
          }
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default MatchingDeliverer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lineone: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 20,
  },
  buttonContainer: {},
  buttonOutline: {},
  buttonOutlineText: {},
  buttonText: {
    color: "blue",
  },
  buttonView: {
    position: "absolute",
    top: (5 / 6) * height,
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
  inputContainer: {},
  heading: {
    position: "absolute",
    top: 100,
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  font: {
    textAlign: "center",
    maxWidth: 200,
    fontWeight: "bold",
  },
  topleftbutton: {
    position: "absolute",
    left: 25,
    top: 50,
  },
  toprightbutton: {
    position: "absolute",
    right: 25,
    top: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: (1 / 5) * height,
    bottom: (1 / 6) * height,
  },
});
