import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { login, getUserFromEmail, getCurrentUser } from "../../firebase";
import { BButton } from "../../components";

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const _loginAndNavigateTo = (screen = "Home") => {
    if (!email) {
      navigation.navigate(screen); // TODO remove and stop access
      return;
    }
    login(email, password);
    if (!getCurrentUser()) {
      return;
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container} behavior="padding">
      <KeyboardAvoidingView style={styles.inputContainer}>
        <Image
          source={require("../../assets/buzzExLogo.png")}
          style={{
            width: 150,
            height: 167,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={onChangeEmail}
          style={styles.input}
        ></TextInput>

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={onChangePassword}
          style={styles.input}
          secureTextEntry={true}
        ></TextInput>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <BButton
          containerStyle={{ width: "100%", marginTop: 20 }}
          text="Buyer/Seller Login"
          onPress={() => _loginAndNavigateTo("Home")}
        />
        <BButton
          containerStyle={{ width: "100%", marginTop: 20 }}
          text="Deliverer Login"
          onPress={() => _loginAndNavigateTo("DeliveriesAvailable")}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Registration")}
          buttonStyle={{ borderWidth: 0 }}
          type="outline"
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={{ width: "100%", marginTop: 20 }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 5,
  },
  buttonContainer: {
    width: 250,
  },
  buttonText: {
    color: "blue",
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
  heading: {
    textAlign: "center",
    padding: 5,
  },
});
