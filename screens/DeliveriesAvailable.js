import React, {useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { KeyboardAvoidingView } from "react-native";
import { BButton } from "../components";

const DeliveriesAvailable = ({navigation}) => {
    const deliverer = "Dan"
    const item_list = ["Bike", "Robot", "Laptop", "PS5", "Atari"];
    const zipcode = "30318"

    const radio_props = [
        {label: item_list[0], value: item_list[0] },
        {label: item_list[1], value: item_list[1] }
      ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <Text style={[styles.label]}> Welcome {deliverer}!</Text>
    <Text style={[styles.label]}> Showing available deliveries for...</Text>
    <Text style={[styles.label]}> {zipcode}</Text>
    <View style={styles.inputContainer}>
    <RadioForm
        radio_props={radio_props}
        formHorizontal={false}
        initial={'Buyer/Seller'}
        onPress={(value) => {onChangeUserType(value)}}
    />
    <BButton text="Accept" onPress={()=>navigation.navigate("Map")}/> 
    </View>
    </KeyboardAvoidingView>
  )
}

export default DeliveriesAvailable

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  label: {
    padding: 15,
  },
 
  inputContainer: {},
});