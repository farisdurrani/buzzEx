import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";

const PictureDropoff = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />
      <View>
        <Text style={styles.titleText}>
          Take a picture of Bike in dropoff location
        </Text>
      </View>
      <View style={LAYOUT.centerMiddle}>
        <Text style={{ fontSize: 20 }}>Take Picture</Text>
        <TouchableOpacity
          style={[styles.cameraButton, LAYOUT.centerMiddle]}
          onPress={() => {
            navigation.navigate("TakePicture", {
              returnScreen: "ConfirmDelivery",
            });
          }}
        >
          <AntDesign name="camera" size={50} color={COLORS.primary_red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PictureDropoff;

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
    marginVertical: 70,
    textAlign: "center",
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
