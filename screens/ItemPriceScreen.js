import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import BButton from "../components/BButton";
import { Camera } from "expo-camera";

const ItemPriceScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperButtons}>
        <TouchableOpacity>
          <Text>⭠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Bob Builder</Text>
      <Text style={styles.username}>@bobTheBuilder</Text>
      <Text style={styles.text}>Item Name</Text>
      <TextInput style={styles.input} placeholder="Location" />
      <Text style={styles.text}>Item Price</Text>
      <TextInput style={styles.input} placeholder="$12.00" />
      <Text style={styles.text}>Item Picture</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TakePicture");
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
      </TouchableOpacity>
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
    width: 100,
    height: 100,
  },
});
