import React, {useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { KeyboardAvoidingView } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { COLORS, LAYOUT } from "../../constants";
import { TextInput } from "react-native";
import { BButton, BackCancelButtons } from "../../components/index";

const DeliveriesAvailable = ({navigation}) => {
    const deliverer = "Dan"
    const item_list = ["Bike", "Robot", "Laptop", "PS5", "Atari"];
    const [zipcode, setZipcode] = useState("");

    const ItemDetailGroup = (props) => {

    const { title, placeholder, state, setState } = props;
    return (
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.detailTitle}>{title}</Text>
        <KeyboardAvoidingView
          style={[styles.inputContainer, LAYOUT.centerMiddle]}
        >
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            onEndEditing={(e) => {
              setState(e.nativeEvent.text);
            }}
            defaultValue={state}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

    const radio_props = [
        {label: item_list[0], value: item_list[0] },
        {label: item_list[1], value: item_list[1] }
      ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <BackCancelButtons navigation={navigation} />
    <Text><Text style={[styles.welcome]}> Welcome</Text> <Text style={[styles.name]}>{deliverer}!</Text></Text>
    <Text style={[styles.label]}> Showing available deliveries for...</Text>
    <Text style={[styles.zipcode]}> {zipcode}</Text>
    <ItemDetailGroup
        title="Zipcode"
        placeholder="Zipcode"
        state={zipcode}
        setState={setZipcode}
      />
    <View style={styles.inputContainer}>
    <RadioForm
        radio_props={radio_props}
        formHorizontal={false}
        initial={'Buyer/Seller'}
        onPress={(value) => {onChangeUserType(value)}}
    />
    <BButton style={styles.accept} text="Accept" onPress={()=>navigation.navigate("Pickup")}/> 
    </View>
    </KeyboardAvoidingView>
  )
}

export default DeliveriesAvailable

const styles = StyleSheet.create({
  container: {
    height: "90%",
      paddingVertical: 50,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "space-between",
  },
  welcome: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    color: COLORS.primary_red,  
    paddingTop: 50,
    fontSize: 30,
    fontWeight: "bold",
  },
  label: {
    paddingTop: 40,
    fontSize: 18,
    padding: 15,
  },

  zipcode: {
    paddingTop: 10,
    fontSize: 18,
    padding: 0,
  },
 
  inputContainer: {},
});