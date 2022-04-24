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
import { getJob, unsubscribeDeliveryJob } from "../../firebase";

const SellerAwaitingScreen = ({ navigation, route }) => {
  const { senderItem, receiverItem, deliveryJobID } = route.params;
  const [packageItem, setPackageItem] = useState();
  const [message, setMessage] = useState(
    `Awaiting for ${receiverItem.data.full_name} to accept...`
  );
  const [unsubscribe, setUnSubscribe] = useState();

  useEffect(async () => {
    if (!packageItem) {
      const delivItem = await getJob(deliveryJobID);
      setPackageItem(delivItem);
      const unsub = unsubscribeDeliveryJob(deliveryJobID, setPackageItem);
      setUnSubscribe(unsub);
    }

    if (packageItem.status === 1) {
      setMessage(`Request accepted.\nFinding a deliverer...`);
    } else if (packageItem.status >= 2) {
      unsubscribe();
      navigation.navigate("SellerAccepted", {
        senderItem: senderItem,
        receiverItem: receiverItem,
        packageItem: packageItem,
      });
    }
  }, [packageItem]);

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SellerAccepted", {
            senderItem: senderItem,
            receiverItem: receiverItem,
            packageItem: packageItem, // TODO remove all of this
          });
        }}
      >
        <Text style={styles.awaitingText}>{message}</Text>
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
