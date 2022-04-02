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

const ConfirmPickup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text style={styles.query}>Have you picked up the item?</Text>
      <BButton
        containerStyle={styles.buttonContainer}
        text="Yes"
        onPress={() => {
          navigation.navigate("DropoffAt");
        }}
      />
      <BButton
        containerStyle={styles.buttonContainer}
        text="No"
        onPress={() => {
          navigation.navigate("PickupPackage");
        }}
      />
    </View>
  );
};

export default ConfirmPickup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  query: {
    width: 300,
    marginBottom: 40,
    fontSize: 25,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 35,
    width: 200,
  },
});
