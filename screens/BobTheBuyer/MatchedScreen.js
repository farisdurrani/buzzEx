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

const MatchedScreen = ({ route, navigation }) => {
  const { mapProps, deliveryRequests } = route.params;
  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <Text style={styles.mainText}>
        Dan will be delivering you the package!
      </Text>

      <Image
        source={require("../../assets/earth_face.png")}
        style={styles.profilePic}
      />
      <View style={[LAYOUT.centerMiddle]}>
        <Text style={styles.name}>Dan Deliverer</Text>
        <Text style={styles.username}>@danTheDeliverer</Text>
      </View>

      <View style={[LAYOUT.row, { marginTop: 10 }]}>
        <AntDesign name="star" size={20} color={COLORS.primary_red} />
        <Text> 4.41</Text>
      </View>

      <View style={{ marginTop: 60 }}>
        <BButton
          text="Continue"
          onPress={() => {
            navigation.navigate("DelivererToPickup", {
              mapProps: mapProps,
              deliveryRequests: deliveryRequests
            });
          }}
        />
      </View>
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
  mainText: {
    marginTop: 50,
    fontSize: 40,
    textAlign: "center",
  },
  profilePic: {
    marginTop: 50,
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  name: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    color: COLORS.primary_red,
  },
});

export default MatchedScreen;
