import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants";

const BButton = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary_blue,
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
