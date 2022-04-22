import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { KeyboardAvoidingView } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { COLORS, LAYOUT } from "../../constants";
import { TextInput } from "react-native";
import { BButton, BackCancelButtons } from "../../components/index";
import { InputTextField } from "../../components";
import {
  getJobs,
  getUserDetails,
  getCurrentUser,
  updateDeliveryStatus,
} from "../../firebase";

const DeliveriesAvailable = ({ navigation }) => {
  const [deliverer, setDeliverer] = useState("");
  const item_list = ["Bike", "Robot", "Laptop", "PS5", "Atari"];
  const [zipcode, setZipcode] = useState("30332");
  const [allAvailableJobs, setAllAvailableJobs] = useState([]);

  React.useEffect(async () => {
    const current_name = (
      await getUserDetails(getCurrentUser().uid)
    ).data.user_name.split(" ")[0];
    setDeliverer(current_name);

    const available_jobs = await getJobs(1);
    setAllAvailableJobs(available_jobs);
  }, []);

  const _DeliveryRow = (props) => {
    const { packageItem } = props;

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

    return (
      <View style={stylesRow.container}>
        <View style={stylesRow.itemDetailGroup}>
          <Text style={stylesRow.text}>{packageItem.data.package.name}</Text>
          <Text style={stylesRow.text}>5 miles</Text>
        </View>
        <BButton
          text="Accept"
          onPress={async () => {
            await updateDeliveryStatus(packageItem.id, 2);
            navigation.navigate("PickupScreen", { packageItem: packageItem });
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
    return allAvailableJobs.map((e) => {
      return <_DeliveryRow packageItem={e} />;
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackCancelButtons navigation={navigation} />
      <Text>
        <Text style={[styles.welcome]}> Welcome</Text>{" "}
        <Text style={[styles.name]}>{deliverer}!</Text>
      </Text>
      <Text style={[styles.label]}> Showing available deliveries for...</Text>
      <InputTextField
        placeholder={"Zipcode"}
        textState={zipcode}
        setTextState={setZipcode}
      />
      <View style={styles.inputContainer}>
        <_AllDeliveryRows />
      </View>
    </KeyboardAvoidingView>
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
