import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";
import {
  generateGeolocation,
  getCurrentLocation,
  getUserDetails,
  updateDeliveryStatus,
} from "../../firebase";

const PickupScreen = ({ navigation, route }) => {
  const { packageItem, delivererItem } = route.params;

  const [senderItem, setSenderItem] = useState();
  const [receiverItem, setReceiverItem] = useState();
  const [deliverer_coord, set_deliverer_coord] = useState();

  const source_address = packageItem.data.source_address;

  useEffect(async () => {
    setSenderItem(await getUserDetails(packageItem.data.sender_uid));
    setReceiverItem(await getUserDetails(packageItem.data.receiver_uid));

    packageItem.data.deliverer_uid = delivererItem.data.uid;
    packageItem.data.status = 2;
    await updateDeliveryStatus(packageItem.id, 2, {
      deliverer_uid: delivererItem.data.uid,
    });

    const current_location = await getCurrentLocation();
    set_deliverer_coord(current_location);
  }, []);

  const _ChoiceRow = (props) => {
    const { choice } = props;
    return (
      <View style={stylesRow.container}>
        <View style={stylesRow.itemDetailGroup}>
          <Text style={stylesRow.text}>{choice}</Text>
        </View>
        <BButton
          text="Go"
          onPress={() => {
            navigation.navigate("PickupPackage", {
              packageItem: packageItem,
              delivererItem: delivererItem,
              receiverItem: receiverItem,
              senderItem: senderItem,
              init_deliverer_coord: deliverer_coord,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text style={{ fontSize: 40, marginTop: 70 }}>
        {`Pickup ${packageItem.data.package.name} at ${
          senderItem ? senderItem.data.full_name.split(" ")[0] : ""
        }'s`}
      </Text>

      <View style={styles.addressContainer}>
        <Text style={styles.address}>{source_address.line1}</Text>
        {source_address.line2 ? (
          <Text style={styles.address}>{source_address.line2}</Text>
        ) : undefined}
        <Text
          style={styles.address}
        >{`${source_address.city}, ${source_address.state} ${source_address.zip}`}</Text>
      </View>

      <_ChoiceRow choice="Google Maps" />
      <_ChoiceRow choice="Waze" />
    </View>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  address: {
    fontSize: 24,
  },
  addressContainer: {
    marginVertical: 100,
    backgroundColor: COLORS.transparent_gray,
    width: 300,
    padding: 15,
  },
  container: {
    height: "90%",
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  prompt: {
    paddingTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    color: COLORS.primary_red,
  },
  detailTitle: {
    paddingTop: 20,
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 10,
    width: 150,
    paddingVertical: 8,
    backgroundColor: COLORS.transparent_gray,
  },
  inputText: {
    fontSize: 20,
  },
  picture: {
    width: "90%",
    height: "90%",
  },
  cameraButton: {
    marginTop: 10,
    height: 150,
    width: 150,
    backgroundColor: COLORS.transparent_gray,
  },
});

const stylesRow = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent_gray,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 350,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetailGroup: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 23,
  },
});
