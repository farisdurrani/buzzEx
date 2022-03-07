import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import BButton from "../components/BButton";

const ItemPriceScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperButtons}>
        <TouchableOpacity>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Bob Builder</Text>
      <Text style={styles.username}>@bobTheBuilder</Text>
      <Text style={styles.text}>Item Name</Text>
      <TextInput style={styles.input} placeholder="Location" />
      <Text style={styles.text}>Item Price</Text>
      <TextInput style={styles.input} placeholder="$12.00" />
      <Text style={styles.text}>Item Picture</Text>
      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </View>
      <BButton text="Continue" />
    </View>
  );
};

export default ItemPriceScreen;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
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
  name: {
    paddingTop: 50,
    fontSize: 20,
  },
  username: {
    fontSize: 16,
  },
  text: {
    paddingTop: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
