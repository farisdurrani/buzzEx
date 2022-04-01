import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

const DeliveryComplete = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topleftbutton}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.toprightbutton}>
        <TouchableOpacity onPress={() => navigation.navigate("CancelScreen")}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.linetwo}>Delivery Complete!</Text>

      <Image
        source={require("../../assets/buzzExLogo.png")}
        style={{
          width: 150,
          height: 167,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />

      <Button
        onPress={() => navigation.navigate("Home")}
        style={[styles.button, styles.buttonOutline]}
        title="Go Home"
        buttonStyle={{
          borderRadius: 20,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 5,
        }}
      ></Button>
    </View>
  );
};

export default DeliveryComplete;

const styles = StyleSheet.create({
  lineone: {
    paddingBottom: 50,
    fontSize: 45,
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
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
  heading: {
    textAlign: "center",
    padding: 5,
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
});
