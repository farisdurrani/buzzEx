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
import { BButton } from "../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../constants";

const ItemPriceScreen = ({ navigation, route }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const ItemDetailGroup = (props) => {
    const { title, placeholder, state, setState } = props;
    return (
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.detailTitle}>{title}</Text>
        <KeyboardAvoidingView
          style={[styles.inputContainer, LAYOUT.centerMiddle]}
        >
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            onEndEditing={(e) => {
              setState(e.nativeEvent.text);
            }}
            defaultValue={state}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperButtons}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.name}>Bob Builder</Text>
        <Text style={styles.username}>@bobTheBuilder</Text>
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
            navigation.navigate("TakePicture");
          }}
        >
          {route.params ? (
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
      <BButton text="Continue" />
      <Text>{route.params?.id}</Text>
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
  upperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
