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

const BuyerAcceptScreen = ({ navigation }) => {
    return (
       
            <View style={styles.container}>
                <Text style={styles.lineone}>Hi Bob!</Text>
                <Text style={styles.linetwo}>Sally would like to send you a package!</Text>
                <Text style={styles.linethree}>Would you like to accept or deny?</Text>
                
                <Button
                    onPress={() => navigation.navigate('FindDelivererScreen')}
                    style={[styles.button, styles.buttonOutline]}
                    title="Accept"
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
                    onPress={() => navigation.navigate('CancelScreen')}
                    style={[styles.button, styles.buttonOutline]}
                    title="Deny"
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

export default BuyerAcceptScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    lineone: {
        paddingBottom: 50,
        fontSize: 45,
        fontWeight: "bold",
        textAlign: "center",
      },
      linetwo: {
        paddingBottom: 25,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
      },
      linethree: {
        paddingBottom: 25,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
      },
    font: {
      textAlign: "center",
      maxWidth: 200,
      fontWeight: 'bold'
    }
});
