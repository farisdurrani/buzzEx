import React from "react";
import {BackCancelButtons } from "../../components/index";

import React from 'react'
import { View } from "react-native";

const Picture = () => {
  return (
    <View style={StyleSheet.mainContainer}>
    <BackCancelButtons navigation={navigation} />
    <View style={LAYOUT.centerMiddle}>
        <Text>Take a picture of</Text>
        <Text>Bike in dropoff</Text>
        <Text>location</Text>
    </View>
    <View style={LAYOUT.centerMiddle}>
        <Text style={styles.detailTitle}>Take Picture</Text>
        <TouchableOpacity
          style={[styles.cameraButton, LAYOUT.centerMiddle]}
          onPress={() => {
            navigation.navigate("TakePicture");
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
    </View>
  )
}

export default Picture

const styles = StyleSheet.create({
    mainContainer: {
      height: "90%",
      paddingVertical: 60,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "space-between",
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