import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BButton from "../components/BButton";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../constants";

const ItemPriceScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperButtons}>
        <TouchableOpacity>
          <Text>⭠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.name}>Bob Builder</Text>
        <Text style={styles.username}>@bobTheBuilder</Text>
      </View>
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.text}>Item Name</Text>
        <TextInput style={styles.input} placeholder="Bike" />
      </View>
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.text}>Item Price</Text>
        <TextInput style={styles.input} placeholder="$12.00" />
      </View>
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.text}>Item Picture</Text>
        <TouchableOpacity
          style={[styles.cameraButton, LAYOUT.centerMiddle]}
          onPress={() => {
            navigation.navigate("TakePicture");
          }}
        >
          <AntDesign name="camera" size={50} color={COLORS.primary_red} />
        </TouchableOpacity>
      </View>
      <BButton text="Continue" />
    </View>
  );
};

export default ItemPriceScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  upperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    paddingTop: 50,
    fontSize: 30,
  },
  username: {
    fontSize: 20,
  },
  text: {
    paddingTop: 20,
    fontSize: 20,
  },
  input: {
    fontSize: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  cameraButton: {
    marginTop: 10,
    height: 150,
    width: 150,
    backgroundColor: COLORS.transparent_gray,
  },
});
