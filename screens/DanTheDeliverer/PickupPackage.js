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
import Icon from "react-native-vector-icons/Feather";
import MapComponent from "../../components/MapComponent";
import { getCurrentLocation } from "../../firebase";
import { makeFullAddress } from "../../constants";

let { width, height } = Dimensions.get("window"); //Screen dimensions
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04; // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // Dependent on LATITUDE_DELTA

const PickupPackage = ({ navigation, route }) => {
  const { packageItem, delivererItem, receiverItem, senderItem } = route.params;

  const [deliveryNotes, onAddDeliveryNotes] = useState("");
  const [mapProps, setMapProps] = useState();

  const pickup_address = packageItem.data.source_address;
  const full_pickUp_address = makeFullAddress(pickup_address);

  useEffect(async () => {
    const deliverer_coord = await getCurrentLocation();
    const [sourceLat, sourceLong] = [
      deliverer_coord.latitude,
      deliverer_coord.longitude,
    ];
    const [destinationLat, destinationLong] = [
      pickup_address.address_coord.latitude,
      pickup_address.address_coord.longitude,
    ];

    const hasLocationData = pickup_address && deliverer_coord;
    const newMapProps = hasLocationData
      ? {
          source: { sourceLat: sourceLat, sourceLong: sourceLong },
          dest: { destLat: destinationLat, destLong: destinationLong },
          LATITUDE_DELTA: LATITUDE_DELTA,
          LONGITUDE_DELTA: LONGITUDE_DELTA,
          style: styles.map,
        }
      : null;
    setMapProps(newMapProps);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topleftbutton}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.lineone}>ETA - 2:55</Text>
      </View>
      {mapProps ? (
        <MapComponent mapProps={{ ...mapProps, style: styles.map }} />
      ) : (
        <Text style={styles.paragraph}>Loading Map...</Text>
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.linetwo}>
          {`Picking up at ${full_pickUp_address}`}
        </Text>
        <TextInput
          placeholder="Any delivery notes?"
          value={deliveryNotes}
          onChangeText={onAddDeliveryNotes}
        ></TextInput>
        <Icon.Button
          name="phone"
          backgroundColor="#000000"
          onPress={() => {}}
        ></Icon.Button>
        <BButton
          text="Pickup Package"
          onPress={() =>
            navigation.replace("ConfirmPickup", {
              mapProps: mapProps,
              packageItem: packageItem,
              delivererItem: delivererItem,
              receiverItem: receiverItem,
              senderItem: senderItem,
            })
          }
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 5,
          }}
        />
      </View>
    </View>
  );
};

export default PickupPackage;

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
  linetwo: {
    paddingBottom: 25,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  linethree: {
    paddingBottom: 25,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    padding: 20,
  },
  buttonView: {
    position: "absolute",
    top: (5 / 6) * height,
  },
  buttonContainer: {},
  buttonOutline: {},
  buttonOutlineText: {},
  buttonText: {
    color: "blue",
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
  inputContainer: {},
  headingContainer: {
    position: "absolute",
    top: 50,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 25,
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
  map: {
    ...StyleSheet.absoluteFillObject,
    top: (1 / 7) * height,
    bottom: (1 / 3) * height,
  },
});
