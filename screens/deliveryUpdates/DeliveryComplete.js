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
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";
import MapComponent from "../../components/MapComponent";
import { COLORS, makeFullAddress } from "../../constants";
import {
  generateGeolocation,
  getCurrentLocation,
  getJob,
  updateDeliveryStatus,
} from "../../firebase";

const { width, height } = Dimensions.get("window"); //Screen dimensions
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04; // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // Dependent on LATITUDE_DELTA

const DeliveryComplete = ({ navigation, route }) => {
  const {
    packageItem,
    homeScreen,
    receiverItem,
    senderItem,
    delivererItem,
    user_type,
    init_deliverer_coord = null, // only has a possible value if this is a deliverer
  } = route.params;
  const [updatedPackageItem, setUpdatedPackageItem] = useState(packageItem);

  const dropOff_address = updatedPackageItem.data.destination_address;
  const full_dropOff_address = makeFullAddress(dropOff_address);
  const [sourceLat, sourceLong] = [
    init_deliverer_coord?.latitude ||
      updatedPackageItem.data.deliverer_location?.latitude,
    init_deliverer_coord?.longitude ||
      updatedPackageItem.data.deliverer_location?.longitude,
  ];
  const [destinationLat, destinationLong] = [
    dropOff_address.address_coord.latitude,
    dropOff_address.address_coord.longitude,
  ];
  const hasLocationData = destinationLat && sourceLat;
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
    // if this is a buyer/seller, retrieve the latest deliverer location
    if (user_type === "Buyer/Seller") {
      await getJob(packageItem.id).then((newPackageItem) =>
        setUpdatedPackageItem(newPackageItem)
      );
      return;
    }

    // if this is a deliverer, retrieve this user's current location and update the delivery status and location
    await getCurrentLocation().then(async (loc) => {
      await updateDeliveryStatus(
        packageItem.id,
        4,
        {},
        generateGeolocation(loc.latitude, loc.longitude)
      );
      packageItem.data.status = 4;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.lineone}>Delivery Complete!</Text>
      </View>
      {mapProps ? (
        <MapComponent mapProps={{ ...mapProps, style: styles.map }} />
      ) : (
        <Text style={styles.paragraph}>Loading Map...</Text>
      )}
      <View style={styles.bottomContainer}>
        <Text style={styles.linetwo}>
          {`Arrived at ${full_dropOff_address}`}
        </Text>

        <Icon.Button
          name="phone"
          backgroundColor={COLORS.white}
          onPress={() => {}}
        ></Icon.Button>
        <BButton
          text="Return to Home"
          onPress={() => navigation.replace(homeScreen)}
          containerStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default DeliveryComplete;

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
    fontSize: 20,
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
    width: 200,
    marginHorizontal: 50,
    marginVertical: 5,
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
