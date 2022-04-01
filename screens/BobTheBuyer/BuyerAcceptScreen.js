import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton } from "../../components";
import { COLORS } from "../../constants";

const BuyerAcceptScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi Bob!</Text>
        <Text style={styles.query1}>
          Sally would like to send you a package!
        </Text>
        <Text style={styles.query2}>Would you like to accept the package?</Text>
        <BButton
          containerStyle={styles.buttonContainer}
          text="Accept"
          onPress={() => {
            // navigation.navigate();
          }}
        />
        <BButton
          containerStyle={styles.buttonContainer}
          text="Deny"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default BuyerAcceptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginBottom: 70,
    fontSize: 40,
    fontWeight: "bold",
  },
  query1: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
  },
  query2: {
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
