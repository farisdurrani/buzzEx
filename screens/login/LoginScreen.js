import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { auth } from "../../firebase";
import { BButton } from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
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
      </View>

      <View style={styles.buttonContainer}>
        <BButton
          containerStyle={{ width: "100%", marginTop: 20 }}
          text="Buyer/Seller Login"
          onPress={() => navigation.navigate("Home")}
        />
        <BButton
          containerStyle={{ width: "100%", marginTop: 20 }}
          text="Deliverer Login"
          onPress={() => navigation.navigate("DeliveriesAvailable")}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Registration")}
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
          }}
          type="outline"
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={{ width: "100%", marginTop: 20 }}
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
