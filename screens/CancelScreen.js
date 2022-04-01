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

const CancelScreen = ({ navigation }) => {
    return (
        
            <View style={styles.container}>
                <Text style={styles.lineone}>Would you like to cancel?</Text>
                
                
                <Button
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.button, styles.buttonOutline]}
                    title="Yes"
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
                    onPress={() => navigation.goBack()}
                    style={[styles.button, styles.buttonOutline]}
                    title="No"
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

export default CancelScreen;

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
