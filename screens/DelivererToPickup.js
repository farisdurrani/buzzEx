import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Image,
} from "react-native";
import { Input, Button, Text, useTheme } from 'react-native-elements';
import { BButton } from "../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Feather';

const DelivererToPickup = ({ navigation }) => {
    const [deliveryNotes, onAddDeliveryNotes] = useState("");
    return (
            <View style={styles.container}>
                
                <View style={styles.topleftbutton}>
                
                <TouchableOpacity onPress={navigation.goBack}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                
              </View>

              
              <Text style={styles.lineone}>ETA - 2:55</Text>
                <Image 
                    source={require('../assets/buzzExLogo.png')} 
                    style={{width: 150, height: 167, marginLeft: "auto", marginRight: "auto"}}
                />
                
                <Text style={styles.linetwo}>Dan is on the way to pickup the delivery!</Text>
                <View style={{marginTop: 16, marginBottom: 16}}>
            {/* Icon.Button Component */}
            <Icon.Button
              name="phone"
              backgroundColor="#000000"
              onPress={() => navigation.navigate('DelivererToDropoff')}>
             
            </Icon.Button>
            

            <TextInput
                    placeholder="Any delivery notes?"
                    value={deliveryNotes}
                    onChangeText={onAddDeliveryNotes}
                    
                ></TextInput>

          </View>

          <Button
                    onPress={() => navigation.navigate('DelivererToDropoff')}
                    style={[styles.button, styles.buttonOutline]}
                    title="Go to Deliverer to dropoff screen"
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

            </View>
            
        
    );
};

export default DelivererToPickup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lineone: {
        paddingBottom: 50,
        fontSize: 45,
        fontWeight: "bold",
        textAlign: "center",
      },
      linetwo: {
        paddingBottom: 25,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },
      linethree: {
        paddingBottom: 25,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
      },
    button: {
        padding: 20
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
        borderColor: "rgba(0, 0, 0, .2)"
    },
    inputContainer: {},
    heading: {
        textAlign: 'center',
        padding: 5,
    },
    font: {
      textAlign: "center",
      maxWidth: 200,
      fontWeight: 'bold'
    },
    topleftbutton: {
        position: "absolute",
        left: 25,
        top: 50,
    },
    toprightbutton: {
        position: "absolute",
        right: 25,
        top: 50,
    },
});
