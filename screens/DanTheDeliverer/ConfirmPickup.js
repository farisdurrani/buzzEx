import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton, BackCancelButtons } from "../../components";
import { COLORS } from "../../constants";
import { updateDeliveryStatus } from "../../firebase";

const ConfirmPickup = ({ navigation, route }) => {
  const { packageItem, delivererItem, receiverItem, senderItem } = route.params;

  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text style={styles.query}>Have you picked up the item?</Text>
      <BButton
        containerStyle={styles.buttonContainer}
        text="Yes"
        onPress={async () => {
          navigation.navigate("DropoffAt", {
            packageItem: packageItem,
            delivererItem: delivererItem,
            receiverItem: receiverItem,
            senderItem: senderItem,
          });
        }}
      />
      <BButton
        containerStyle={styles.buttonContainer}
        text="No"
        onPress={() => {
          navigation.replace("PickupPackage", {
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

export default ConfirmPickup;

const styles = StyleSheet.create({
  container: {
    height: "95%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  query: {
    width: 300,
    marginTop: 150,
    marginBottom: 40,
    fontSize: 25,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 35,
    width: 200,
  },
});
