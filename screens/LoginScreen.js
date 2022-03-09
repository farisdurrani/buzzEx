import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
  }, []);
  // unused
  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleLogin = () => {
    auth
      .signInEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Button
          title={"X"}
          onPress={() => {
            navigation.navigate("ItemPrice");
          }}
        />
        <Image
          source={require("../assets/buzzExLogo.png")}
          style={{
            width: 150,
            height: 167,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text style={styles.heading} h1>
          Login
        </Text>
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
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
          title="Login"
          buttonStyle={{
            borderRadius: 20,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 5,
          }}
        ></Button>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Registration")}
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
          }}
          type="outline"
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 5,
          }}
        />
      </View>
    </KeyboardAvoidingView>
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
  buttonContainer: {},
  buttonOutline: {},
  buttonOutlineText: {},
  buttonText: {
    color: "blue",
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
  inputContainer: {},
  heading: {
    textAlign: "center",
    padding: 5,
  },
});
