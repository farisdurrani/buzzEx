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
import { InputTextField } from "../../components";

const ItemPriceScreen = ({ navigation, route }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  let snapURI = null;

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
  
  if (route.params && route.params.snapURI) {
    snapURI = route.params.snapURI;
  }

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.name}>{route.params.receiver_data.fullname}</Text>
        <Text style={styles.username}>{route.params.receiver_data.email}</Text>
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
            navigation.navigate("TakePicture", { returnScreen: "ItemPrice" });
          }}
        >
          {snapURI ? (
            <Image
              style={styles.picture}
              source={{
                uri: route.params.snapURI,
              }}
            />
          ) : (
            <AntDesign name="camera" size={50} color={COLORS.primary_red} />
          )}
        </TouchableOpacity>
      </View>
      <BButton
        text="Continue"
        onPress={() =>
          navigation.navigate("SellerConfirm", {
            itemName: itemName ? itemName : "Bike",
            itemPrice: itemPrice && !isNaN(itemPrice) ? Number(itemPrice) : 12,
            snapURI: snapURI,
          })
        }
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
