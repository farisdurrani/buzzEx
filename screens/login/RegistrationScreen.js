import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  Image,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import { BButton } from "../../components";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { register_new_user, generateGeolocation } from "../../firebase";
import * as Location from "expo-location";

const RegistrationScreen = ({ navigation }) => {
  const [fullName, onChangeFullName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const [addr1, onChangeAddr1] = useState("");
  const [addr2, onChangeAddr2] = useState("");
  const [zip, onChangeZip] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [userType, onChangeUserType] = useState("Buyer/Seller");
  const radio_props = [
    { label: "Buyer/Seller", value: "Buyer/Seller" },
    { label: "Deliverer", value: "Deliverer" },
  ];

  const handleSignup = async () => {
    const addressString = addr1 + " " + addr2 + " " + zip + " " + city;
    const coords = await Location.geocodeAsync(addressString);
    const user_data = {
      full_name: fullName,
      email: email,
      address: {
        line1: addr1,
        line2: addr2,
        zip: zip,
        city: city,
        state: state,
        country: "United States",
        address_coord: generateGeolocation(coords.latitude, coords.longitude),
      },
      user_type: userType,
      rating: 5.00,
    };
    register_new_user(email, password, user_data);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container} behavior="padding">
      <View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={onChangeFullName}
            style={styles.input}
          ></TextInput>
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
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            style={styles.input}
            secureTextEntry={true}
          ></TextInput>
          <TextInput
            placeholder="Address Line 1"
            value={addr1}
            onChangeText={onChangeAddr1}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Address Line 2"
            value={addr2}
            onChangeText={onChangeAddr2}
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={onChangeCity}
            style={[styles.input]}
          ></TextInput>
          <TextInput
            placeholder="State"
            value={state}
            onChangeText={onChangeState}
            style={[styles.input]}
          ></TextInput>
          <TextInput
            placeholder="ZIP"
            value={zip}
            onChangeText={onChangeZip}
            style={[styles.input]}
          ></TextInput>
        </KeyboardAvoidingView>
        <Text style={{ padding: 15 }}> User Type:</Text>
        <RadioForm
          radio_props={radio_props}
          formHorizontal={false}
          initial={"Buyer/Seller"}
          onPress={(value) => onChangeUserType(value)}
        />
      </View>

      <View>
        <BButton
          text="Register"
          onPress={handleSignup}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          buttonStyle={{ borderWidth: 0 }}
          type="outline"
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 5,
  },
  input: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
  },
});
