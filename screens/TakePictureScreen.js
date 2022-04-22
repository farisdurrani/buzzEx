// adapted from https://community.draftbit.com/c/code-snippets/how-to-use-camera-from-custom-code-in-a-draftbit-app

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

const TakePictureScreen = ({ navigation, route }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentSnapURI, setCurrentSnapURI] = useState(null);

  const returnScreen = route.params.returnScreen;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const _noCamPermissionsAlert = () => {
    Alert.alert(
      "Camera Permissions Not Granted",
      "Please enable camera permissions in Settings",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate(returnScreen, route.params);
          },
        },
      ]
    );
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
      setCurrentSnapURI(data.uri);

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
    return <View>{_noCamPermissionsAlert()}</View>;
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
            <View style={styles.retakeButtonsContainer}>
              <_RetakeConfirmButton
                title="Retake"
                bgColor="#ff000060"
                onPress={cancelPreview}
              />
              <_RetakeConfirmButton
                title="Confirm"
                bgColor="#00ff0060"
                onPress={() => {
                  const newRouteParams = route.params;
                  newRouteParams.snapURI = currentSnapURI;
                  navigation.navigate(returnScreen, newRouteParams);
                }}
              />
            </View>
          </View>
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                navigation.navigate(returnScreen, route.params);
              }}
            >
              <MaterialIcons name="cancel" size={24} color="white" />
            </TouchableOpacity>
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
};

export default TakePictureScreen;

const _RetakeConfirmButton = (props) => {
  const { title, bgColor, onPress } = props;
  return (
    <Button
      title={title}
      buttonStyle={{
        backgroundColor: bgColor,
        borderRadius: 20,
      }}
      titleStyle={{ fontWeight: "bold", fontSize: 18 }}
      containerStyle={{
        width: 100,
      }}
      onPress={onPress}
    />
  );
};

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
    top: -700,
    right: 40,
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
  retakeButtonsContainer: {
    width: "100%",
    paddingHorizontal: 80,
    marginTop: 750,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
