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


const DropoffAt = ({ navigation }) => {
  const ChoiceRow = (props) => {
    const { choice } = props;

    const stylesRow = StyleSheet.create({
      container: {
        backgroundColor: COLORS.transparent_gray,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: 350,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      itemDetailGroup: {
        display: "flex",
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between"
      },
      text: {
        fontSize: 23,
      },
    });

    return (
      <View style={stylesRow.container}>
        <View style={stylesRow.itemDetailGroup}>
          <Text style={stylesRow.text}>{choice}</Text>
        </View>
        <BButton
          text="Go"
          onPress={() => {
            navigation.navigate("PickupPackage");
          }}
        />

      </View>
    );
  };



  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text style={{ fontSize: 40, marginTop: 70 }}>
        Dropoff Bike at Bob's
      </Text>

      <View style={styles.addressContainer}>
        <Text style={styles.address}>555 Braves Win Dr</Text>
        <Text style={styles.address}>Apt</Text>
        <Text style={styles.address}>Atlanta, GA 30318</Text>
      </View>

      <ChoiceRow choice="Google Maps" />
      <ChoiceRow choice="Waze" />

    </View>
  );
};

export default DropoffAt;

const styles = StyleSheet.create({
  address: {
    fontSize: 24,
  },
  addressContainer: {
    marginVertical: 100,
    backgroundColor: COLORS.transparent_gray,
    width: 300,
    padding: 15,
  },
  container: {
    height: "90%",
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  prompt: {
    paddingTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    color: COLORS.primary_red,
  },
  detailTitle: {
    paddingTop: 20,
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 10,
    width: 150,
    paddingVertical: 8,
    backgroundColor: COLORS.transparent_gray,
  },
  inputText: {
    fontSize: 20,
  },
  picture: {
    width: "90%",
    height: "90%",
  },
  cameraButton: {
    marginTop: 10,
    height: 150,
    width: 150,
    backgroundColor: COLORS.transparent_gray,
  },
});

  