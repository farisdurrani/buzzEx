import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BackCancelButtons, BButton } from "../../components";
import { COLORS, LAYOUT } from "../../constants";
import { getCurrentLocation } from "../../firebase";

const ConfirmDelivery = ({ navigation, route }) => {
  const {
    snapURI = null,
    packageItem,
    delivererItem,
    receiverItem,
    senderItem,
    init_deliverer_coord = null,
  } = route.params;

  const [deliverer_coord, set_deliverer_coord] = useState();

  useEffect(async() => {
    const current_location = await getCurrentLocation();
    set_deliverer_coord(current_location);
  }, [])

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />
      <View>
        <Text style={styles.titleText}>Now to complete your delivery!</Text>
      </View>
      <View style={[LAYOUT.centerMiddle, { marginBottom: 50 }]}>
        <TouchableOpacity
          style={[styles.pictureContainer, LAYOUT.centerMiddle]}
          onPress={() =>
            navigation.navigate("TakePicture", {
              nextScreen: "ConfirmDelivery",
              snapURI: snapURI,
              packageItem: packageItem,
              delivererItem: delivererItem,
              receiverItem: receiverItem,
              senderItem: senderItem,
              init_deliverer_coord: deliverer_coord,
            })
          }
        >
          <Image style={styles.picture} source={{ uri: snapURI }} />
        </TouchableOpacity>
      </View>
      <BButton
        text="Confirm"
        onPress={async () => {
          navigation.replace("DeliveryComplete", {
            homeScreen: "DeliveriesAvailable",
            receiverItem: receiverItem,
            packageItem: packageItem,
            delivererItem: delivererItem,
            receiverItem: receiverItem,
            senderItem: senderItem,
            init_deliverer_coord: deliverer_coord,
          });
        }}
      />
    </View>
  );
};

export default ConfirmDelivery;

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    marginVertical: 60,
    marginHorizontal: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 40,
    textAlign: "center",
  },
  pictureContainer: {
    marginTop: 10,
    height: 450,
    width: 300,
    backgroundColor: COLORS.transparent_gray,
  },
  picture: {
    width: "90%",
    height: "90%",
  },
});
