import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BButton } from "../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../constants";
import { getCurrentUser } from "../firebase";

const CancellationScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Are you sure you want to cancel?</Text>

      <View style={{ width: "50%", marginBottom: 20 }}>
        <BButton
          text="Yes"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
      <View style={{ width: "50%" }}>
        <BButton
          text="No"
          onPress={() => {
            navigation.goBack();
          }}
        />
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
    marginTop: 200,
    marginBottom: 100,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CancellationScreen;
