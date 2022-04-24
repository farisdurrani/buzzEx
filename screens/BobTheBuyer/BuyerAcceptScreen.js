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
import { getUserDetails } from "../../firebase";

const BuyerAcceptScreen = ({ navigation, route }) => {
  const { packageItem, receiverItem } = route.params;
  const [senderItem, setSenderItem] = useState({
    data: { full_name: "Loading..." },
  });

  useEffect(async () => {
    const senderDetails = await getUserDetails(packageItem.data.sender_uid);
    setSenderItem(senderDetails);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text style={styles.greeting}>
          Hi {receiverItem.data.full_name.split(" ")[0]}!
        </Text>
        <Text style={styles.query1}>
          {senderItem.data.full_name} would like to send you one{" "}
          {packageItem.data.package.name}!
        </Text>
        <Text style={styles.query2}>Would you like to accept the package?</Text>
        <BButton
          containerStyle={styles.buttonContainer}
          text="Accept"
          onPress={() => {
            navigation.navigate("Payment", {
              packageItem: packageItem,
              senderItem: senderItem,
              receiverItem: receiverItem,
            });
          }}
        />
        <BButton
          containerStyle={styles.buttonContainer}
          text="Deny"
          onPress={() => navigation.navigate("Home")}
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
