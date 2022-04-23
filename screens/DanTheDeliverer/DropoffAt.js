import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";
import { getUserDetails } from "../../firebase";

const DropoffAt = ({ navigation, route }) => {
  const { packageItem, delivererItem, receiverItem, senderItem } = route.params;

  const destination_address = packageItem.data.destination_address;
  const receiver_first_name = receiverItem.data.full_name.split(" ")[0];

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
            navigation.navigate("DropoffPackage", {
              packageItem: packageItem,
              delivererItem: delivererItem,
              receiverItem: receiverItem,
              senderItem: senderItem,
            });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text
        style={{ fontSize: 40, marginTop: 70 }}
      >{`Dropoff ${packageItem.data.name} at ${receiver_first_name}'s`}</Text>

      <View style={styles.addressContainer}>
        <Text style={styles.address}>{destination_address.line1}</Text>
        {destination_address.line2 ? (
          <Text style={styles.address}>{destination_address.line2}</Text>
        ) : undefined}
        <Text
          style={styles.address}
        >{`${destination_address.city}, ${destination_address.state} ${destination_address.zip}`}</Text>
      </View>

      <_ChoiceRow choice="Google Maps" />
      <_ChoiceRow choice="Waze" />
    </View>
  );
};

export default DropoffAt;

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
