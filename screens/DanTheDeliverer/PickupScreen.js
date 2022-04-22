import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";
import { getUserDetails } from "../../firebase";

const PickupScreen = ({ navigation, route }) => {
  const { packageItem } = route.params;

  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");

  useEffect(async () => {
    const sender_uid = packageItem.data.sender_uid;
    const sender_address = (await getUserDetails(sender_uid)).data.address;
    setAddr1(sender_address.line1);
    setAddr2(sender_address.line2);
    setCity(sender_address.city);
    setZip(sender_address.zip);
    setState(sender_address.state);
  }, []);

  const _ChoiceRow = (props) => {
    const { choice } = props;

    return (
      <View style={stylesRow.container}>
        <View style={stylesRow.itemDetailGroup}>
          <Text style={stylesRow.text}>{choice}</Text>
        </View>
        <BButton
          text="Go"
          onPress={() => {
            navigation.navigate("PickupPackage", { packageItem: packageItem });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackCancelButtons navigation={navigation} />
      <Text style={{ fontSize: 40, marginTop: 70 }}>
        Pickup Bike at Sally's
      </Text>

      <View style={styles.addressContainer}>
        <Text style={styles.address}>{addr1}</Text>
        {addr2 ? <Text style={styles.address}>{addr2}</Text> : undefined}
        <Text style={styles.address}>{`${city}, ${state} ${zip}`}</Text>
      </View>

      <_ChoiceRow choice="Google Maps" />
      <_ChoiceRow choice="Waze" />
    </View>
  );
};

export default PickupScreen;

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
    fontSize: 23,
  },
});
