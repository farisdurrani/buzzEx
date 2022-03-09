// adapted from https://community.draftbit.com/c/code-snippets/how-to-use-camera-from-custom-code-in-a-draftbit-app

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import BButton from "../components/BButton";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export function TakePictureScreen() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
      <View style={styles.container}>
        {isPreview && (
          <View>
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
            >
              <AntDesign name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <Button
              title="Retake"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(111, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginTop: 800,
                marginLeft: 50,
                height: 50,
                width: 200,
              }}
              onPress={() => console.log("aye")}
            />
            <Button
              title="Continue"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(255, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginTop: 100,
                marginLeft: 100,
                height: 50,
                width: 200,
              }}
              onPress={() => console.log("aye2")}
            />
          </View>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default TakePictureScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A45FF",
    opacity: 0.7,
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  retake: {
    // position: "absolute",
    padding: 100,
    top: 100,
    // right: 0,
    // borderRadius: 25,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#5A45FF",
    // opacity: 0.7,
  },
});
