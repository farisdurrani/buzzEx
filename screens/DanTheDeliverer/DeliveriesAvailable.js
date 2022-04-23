import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { COLORS, LAYOUT, start_live_location_tracking } from "../../constants";
import { TextInput } from "react-native";
import { BButton, BackCancelButtons } from "../../components/index";
import { InputTextField } from "../../components";
import {
  getJobs,
  getUserDetails,
  getCurrentUser,
  updateDeliveryStatus,
  getCurrentLocation,
} from "../../firebase";
import * as Location from "expo-location";

const DeliveriesAvailable = ({ navigation }) => {
  const [delivererItem, setDelivererItem] = useState();
  const [zipcode, setZipcode] = useState("30332");
  const [allAvailableJobs, setAllAvailableJobs] = useState([]);

  useEffect(async () => {
    const delivererItem = await getUserDetails(getCurrentUser().uid);
    setDelivererItem(delivererItem);

    const available_jobs = await getJobs(1);
    setAllAvailableJobs(available_jobs);
  }, []);

  const _DeliveryRow = (props) => {
    const { packageItem } = props;

    return (
      <View style={stylesRow.container}>
        <View style={stylesRow.itemDetailGroup}>
          <Text style={stylesRow.text}>{packageItem.data.package.name}</Text>
          <Text style={stylesRow.text}>5 miles</Text>
        </View>
        <BButton
          text="Accept"
          onPress={() => {
            navigation.navigate("PickupScreen", {
              packageItem: packageItem,
              delivererItem: delivererItem,
            });
          }}
        />
      </View>
    );
  };

  const _AllDeliveryRows = () => {
    if (allAvailableJobs.length === 0) {
      return (
        <View>
          <Text>No deliveries available...</Text>
        </View>
      );
    }
    return allAvailableJobs.map((e) => (
      <_DeliveryRow packageItem={e} key={e.id} />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} behavior="padding">
      <BackCancelButtons navigation={navigation} />
      <Text>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.name}>
          {` ${
            delivererItem ? delivererItem.data.full_name.split(" ")[0] : ""
          }!`}
        </Text>
      </Text>
      <Text style={styles.label}> Showing available deliveries for...</Text>
      <KeyboardAvoidingView>
        <InputTextField
          placeholder={"Zipcode"}
          textState={zipcode}
          setTextState={setZipcode}
        />
      </KeyboardAvoidingView>
      <View style={styles.inputContainer}>
        <_AllDeliveryRows />
      </View>
    </ScrollView>
  );
};

export default DeliveriesAvailable;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcome: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    color: COLORS.primary_red,
    paddingTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    paddingTop: 40,
    fontSize: 18,
    padding: 15,
  },
  inputContainer: {},
});

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
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
  },
});
