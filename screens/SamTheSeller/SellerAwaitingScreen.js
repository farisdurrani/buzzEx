import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { getJob } from "../../firebase";

const SellerAwaitingScreen = ({ navigation, route }) => {
  const { senderItem, receiverItem, deliveryJobID } = route.params;
  const [deliveryItem, setDeliveryItem] = useState();

  useEffect(async () => {
    const delivItem = await getJob(deliveryJobID);
    setDeliveryItem(delivItem);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SellerAccepted", {
            senderItem: senderItem,
            receiverItem: receiverItem,
            deliveryItem: deliveryItem,
          });
        }}
      >
        <Text style={styles.awaitingText}>Awaiting for Bob to Accept...</Text>
      </TouchableOpacity>
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
  awaitingText: {
    marginTop: 300,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SellerAwaitingScreen;
