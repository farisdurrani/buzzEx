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
import {
  getJobs,
  logout_current_user,
  getCurrentUser,
  getUserDetails,
} from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [numberOfRequests, setNumberOfRequests] = useState(0);
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [receiverItem, setReceiverItem] = useState();

  const current_user = getCurrentUser();

  useEffect(async () => {
    if (!current_user) {
      return;
    }
    // fetch unstarted jobs
    const jobs = await getJobs(0, [["receiver_uid", "==", current_user.uid]]);
    setDeliveryRequests(jobs);
    setNumberOfRequests(jobs.length);
    setReceiverItem(await getUserDetails(current_user.uid));
  }, [current_user]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Image
          source={require("../assets/buzzExLogo.png")}
          style={styles.logo}
        />
        <BButton
          text="Send Item"
          containerStyle={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("Contacts");
          }}
        />
        {numberOfRequests > 0 ? (
          <BButton
            text={`${numberOfRequests} ${
              numberOfRequests > 1 ? "Requests" : "Request"
            }`}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.requestButton}
            onPress={() => {
              navigation.navigate("BuyerAccept", {
                deliveryItem: deliveryRequests[0],
                receiverItem: receiverItem,
              });
            }}
          />
        ) : (
          <Text style={styles.font}>No incoming delivery requests...</Text>
        )}
        {current_user ? (
          <BButton
            text="Log out"
            onPress={() => {
              try {
                logout_current_user();
                navigation.navigate("Login");
              } catch (e) {
                console.log(e.message);
              }
            }}
            containerStyle={styles.buttonContainer}
          />
        ) : undefined}
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
  logo: {
    width: 150,
    height: 167,
    marginLeft: "auto",
    marginRight: "auto",
  },
  requestButton: {
    backgroundColor: COLORS.orange,
    padding: 15,
    borderRadius: 50,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginTop: 20,
  },
  font: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    maxWidth: 200,
    fontWeight: "bold",
  },
});
