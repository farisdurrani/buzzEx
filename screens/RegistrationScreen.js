import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    View,
    TextInput,
    Image
} from "react-native";
import { Input, Button, Text, useTheme } from 'react-native-elements';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import {addUser, getUser, setUser} from "../firebase";
import RadioForm from 'react-native-simple-radio-button';

const RegistrationScreen = ({ navigation }) => {
  const [fullName, onChangeFullName] = useState("");
  const [email, onChangeEmail] = useState("");
  // not sure if we need username 
  // const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const [addr1, onChangeAddr1] = useState("");
  const [addr2, onChangeAddr2] = useState("");
  const [zip, onChangeZip] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [userType, onChangeUserType] = useState("Buyer/Seller");
  const radio_props = [
    {label: 'Buyer/Seller', value: 'Buyer/Seller' },
    {label: 'Deliverer', value: 'Deliverer' }
  ];


  const handleSignup =  () => {
    createUserWithEmailAndPassword(auth, email, password)
     .then(userCredentials => {
        const user = userCredentials.user;
    })
    .catch(error => {
       alert(error.message) 
    })

    addUser({id: `${Date.now()}`,
        user_name: fullName, 
        user_email: email,
        user_addr1: addr1,
        user_addr2: addr2,
        user_zip: zip,
        user_city: city,
        user_state: state,
        user_type: userType
    }).then(() => {
        console.log("added new user")
    })
    .catch(error => {
        alert(error.message)
    })
  
}

  

  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
          <View style={styles.inputContainer}>
              {/* <Image 
                    source={require('../assets/buzzExLogo.png')} 
                    style={{width: 150, height: 167, marginLeft: "auto", marginRight: "auto"}}
                /> */}
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
              <Text style={[styles.label]}> User Type:</Text>
              <RadioForm
                radio_props={radio_props}
                formHorizontal={false}
                initial={'Buyer/Seller'}
                onPress={(value) => {onChangeUserType(value)}}
                />
          </View>

          <View style={styles.buttonContainer}>
              <Button
                  style={[styles.button, styles.buttonOutline]}
                  onPress={handleSignup}
                  title="Register"
                  buttonStyle={{
                    borderRadius: 20,
                  }}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 5,
                }}
              >
              </Button>
              <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
                buttonStyle={{
                  borderColor: 'rgba(78, 116, 289, 1)',
                }}
                type="outline"
                titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 5,
                }}
              />
              {/* <Button
                  onPress={() => navigation.navigate('Login')}
                  style={[styles.button, styles.buttonOutline]}
                  title="Login"
              >
              </Button> */}

              
          </View>
      </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

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
  row: {
    flex: 1,
    flexDirection: "row"
  },
  heading: {
    textAlign: 'center',
    padding: 5,
  },
  label: {
    padding: 15,
  },
  input: {
      padding: 15,
      borderBottomWidth: 1,
      borderColor: "rgba(0, 0, 0, .2)"
  },
  inputContainer: {},
});
