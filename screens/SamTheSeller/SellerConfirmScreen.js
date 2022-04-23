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
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT, roundTo2 } from "../../constants";
import {
  addNewDeliveryJob,
  getCurrentTimestamp,
  generateGeolocation,
  getCurrentUser,
  getUserDetails,
  getJob,
} from "../../firebase";

const SellerConfirmScreen = ({ navigation, route }) => {
  const { senderItem, receiverItem, itemName, itemPrice, snapURI } =
    route.params;
  const DELIVERY_FEE = Math.random() * 5;
  const TOTAL_PRICE = itemPrice + DELIVERY_FEE;
  const TOTAL_TAX_PERCENTAGE = 8.9;

  const _ItemDetailGroup = (props) => {
    const { title, text } = props;
    return (
      <View style={[LAYOUT.centerMiddle]}>
        <Text style={styles.detailTitle}>{title}</Text>
        <View>
          <Text style={{ fontSize: 20 }}>{text}</Text>
        </View>
      </View>
    );
  };

  const deliveryJobToAdd = {
    createdAt: getCurrentTimestamp(),
    currency: "USD",
    deliverer_location: null,
    deliverer_uid: null,
    status: 0,
    timestamp: getCurrentTimestamp(),
    package: {
      name: itemName,
      base_price: itemPrice,
      delivery_fee: DELIVERY_FEE,
      sender_given_photoURL: null,
      deliverer_given_photoURL: null,
      tax: (itemPrice * TOTAL_TAX_PERCENTAGE) / 100,
      tip: 0,
    },
    receiver_uid: receiverItem.data.uid,
    sender_uid: senderItem.data.uid,
    source_address: senderItem.data.address,
    destination_address: receiverItem.data.address,
  };

  const _PriceItem = (props) => {
    const { itemName, price, bold } = props;

    const stylesPIText = StyleSheet.create({
      text: {
        fontWeight: bold ? "bold" : "normal",
        fontSize: 20,
      },
    });

    return (
      <View style={stylesPI.mainContainer}>
        <Text style={stylesPIText.text}>{itemName}</Text>
        <Text style={stylesPIText.text}>{price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <View>
        <Text style={styles.receiverText}>Receiver</Text>
      </View>

      <View style={styles.profileInfo}>
        <Image
          source={require("../../assets/earth_face.png")}
          style={styles.profilePic}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.name}>{receiverItem.data.full_name}</Text>
          <Text style={styles.username}>{receiverItem.data.email}</Text>
        </View>
      </View>

      <View style={LAYOUT.row}>
        <View style={LAYOUT.centerMiddle}>
          <Text style={styles.detailTitle}>Item Picture</Text>
          <TouchableOpacity
            style={[styles.cameraButton, LAYOUT.centerMiddle]}
            onPress={() => {
              navigation.navigate("TakePicture", {
                nextScreen: "SellerConfirm",
                senderItem: senderItem,
                receiverItem: receiverItem,
                itemName: itemName,
                itemPrice: itemPrice,
                snapURI: snapURI,
              });
            }}
          >
            {snapURI ? (
              <Image style={styles.picture} source={{ uri: snapURI }} />
            ) : (
              <AntDesign name="camera" size={50} color={COLORS.primary_red} />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ width: "50%" }}>
          <_ItemDetailGroup title="Item Name" text={itemName} />
          <_ItemDetailGroup title="ETA" text="12:43 pm" />
        </View>
      </View>

      <View>
        <_PriceItem itemName="Item price" price={`\$${roundTo2(itemPrice)}`} />
        <_PriceItem itemName="Delivery" price={`\$${roundTo2(DELIVERY_FEE)}`} />
        <_PriceItem
          itemName="Subtotal"
          price={`\$${roundTo2(TOTAL_PRICE)}`}
          bold="bold"
        />
      </View>

      <BButton
        text="Confirm"
        onPress={async () => {
          const newDeliveryJobID = await addNewDeliveryJob(deliveryJobToAdd);
          navigation.navigate("SellerAwaiting", {
            senderItem: senderItem,
            receiverItem: receiverItem,
            deliveryJobID: newDeliveryJobID,
          });
        }}
      />
    </View>
  );
};

export default SellerConfirmScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  upperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
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
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 10,
    width: 150,
    paddingVertical: 8,
    backgroundColor: COLORS.transparent_gray,
  },
  picture: {
    width: "90%",
    height: "90%",
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "75%",
  },
  cameraButton: {
    marginTop: 10,
    height: 150,
    width: 150,
    backgroundColor: COLORS.transparent_gray,
  },
  receiverText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const stylesPI = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.transparent_gray,
    padding: 10,
    width: 300,
  },
});
