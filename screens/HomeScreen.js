import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton } from "../components";
import { COLORS } from "../constants";
import { getIncompleteJobs } from "../firebase";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

const HomeScreen = ({ navigation }) => {

  const [numberOfRequests, setNumberOfRequests] = useState(0);

  let response = undefined;
  async function fetchIncompleteJobs() {
    response = await getIncompleteJobs();
    setNumberOfRequests(response.length);
  }
  fetchIncompleteJobs();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Image
          source={require("../assets/buzzExLogo.png")}
          style={{
            width: 150,
            height: 167,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <BButton
          text="Send Item"
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("Contacts");
          }}
        />
        {numberOfRequests > 0 ? (
          <BButton
            text={`${numberOfRequests} ${
              numberOfRequests > 1 ? "Requests" : "Request"
            }`}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginTop: 20,
            }}
            buttonStyle={{
              backgroundColor: COLORS.orange,
              padding: 15,
              borderRadius: 50,
            }}
            onPress={() => {
              navigation.navigate("BuyerAccept");
            }}
          />
        ) : (
          <Text style={styles.font}>No incoming delivery requests...</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    maxWidth: 200,
    fontWeight: "bold",
  },
});
