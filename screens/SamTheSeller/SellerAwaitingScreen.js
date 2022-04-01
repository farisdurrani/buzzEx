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
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";

const SellerAwaitingScreen = ({ navigation, route }) => {
  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SellerAccepted");
        }}
      >
        <Text style={styles.awaitingText}>Awaiting for Bob to Accept...</Text>
      </TouchableOpacity>
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
  awaitingText: {
    marginTop: 300,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SellerAwaitingScreen;
