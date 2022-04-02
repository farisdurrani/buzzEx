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
const PickupScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
        <BackCancelButtons navigation={navigation} />
        <View>
        <Text><Text>Pickup</Text> <Text></Text></Text>
      </View>
      </View>
  )
}

export default PickupScreen

const styles = StyleSheet.create({
    container: {
        height: "90%",
          paddingVertical: 50,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "space-between",
      },
    prompt: {
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