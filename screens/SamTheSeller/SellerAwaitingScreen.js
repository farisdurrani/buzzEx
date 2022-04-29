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
  const [unsubscribe, setUnsubscribe] = useState(() => () => {});

  const message = `Awaiting for ${receiverItem.data.full_name} to accept...`;

  useEffect(async () => {
    if (!packageItem) {
      const delivItem = await getJob(deliveryJobID);
      setPackageItem(delivItem);
      const unsub = unsubscribeDeliveryJob(deliveryJobID, setPackageItem);
      setUnsubscribe(() => unsub);
    }
  }, [])

  useEffect(async () => {
    if (packageItem?.data.status >= 1) {
      unsubscribe();
      navigation.navigate("MatchingDeliverer", {
        senderItem: senderItem,
        receiverItem: receiverItem,
        initPackageItem: packageItem,
      });
    }
  }, [packageItem]);

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Accepted", {
            senderItem: senderItem,
            receiverItem: receiverItem,
            packageItem: packageItem,
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
