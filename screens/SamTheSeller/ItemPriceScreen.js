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
import { COLORS, LAYOUT } from "../../constants";
import { InputTextField } from "../../components";
import { getUserDetails } from "../../firebase";

const ItemPriceScreen = ({ navigation, route }) => {
  const { senderItem, receiverItem, snapURI = undefined } = route.params;

  const [itemName, setItemName] = useState("Bike");
  const [itemPrice, setItemPrice] = useState((Math.random() * 50).toString());

  const ItemDetailGroup = (props) => {
    const { title, placeholder, state, setState } = props;
    return (
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.detailTitle}>{title}</Text>
        <InputTextField
          placeholder={placeholder}
          textState={state}
          setTextState={setState}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.name}>{receiverItem.data.full_name}</Text>
        <Text style={styles.username}>{receiverItem.data.email}</Text>
      </View>
      <ItemDetailGroup
        title="Item Name"
        placeholder="Bike"
        state={itemName}
        setState={setItemName}
      />
      <ItemDetailGroup
        title="Item Price"
        placeholder="$12.00"
        state={itemPrice}
        setState={setItemPrice}
      />
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.detailTitle}>Item Picture</Text>
        <TouchableOpacity
          style={[styles.cameraButton, LAYOUT.centerMiddle]}
          onPress={() => {
            navigation.navigate("TakePicture", {
              nextScreen: "ItemPrice",
              senderItem: senderItem,
              receiverItem: receiverItem,
              snapURI: snapURI,
            });
          }}
        >
          {snapURI ? (
            <Image
              style={styles.picture}
              source={{ uri: route.params.snapURI }}
            />
          ) : (
            <AntDesign name="camera" size={50} color={COLORS.primary_red} />
          )}
        </TouchableOpacity>
      </View>
      <BButton
        text="Continue"
        onPress={() => {
          if (!(itemPrice && !isNaN(itemPrice))) {
            alert("Price must be a valid number.");
            return;
          }
          if (!itemName) {
            alert("Missing item name");
            return;
          }
          navigation.navigate("SellerConfirm", {
            senderItem: senderItem,
            receiverItem: receiverItem,
            itemName: itemName,
            itemPrice: Number(itemPrice),
            snapURI: snapURI,
          });
        }}
      />
    </View>
  );
};

export default ItemPriceScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
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
    marginBottom: 8,
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
