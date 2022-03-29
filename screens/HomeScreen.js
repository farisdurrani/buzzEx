import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,
    Image,
} from "react-native";
import { Input, Button, Text, useTheme } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.container}>
                <Image 
                    source={require('../assets/buzzExLogo.png')} 
                    style={{width: 150, height: 167, marginLeft: "auto", marginRight: "auto"}}
                />
                <Button
                    onPress={() => navigation.navigate('Contactstemp')}
                    style={[styles.button, styles.buttonOutline]}
                    title="Send Item"
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
                <Text style={styles.font}>
                  No incoming delivery requests...
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

export default HomeScreen;

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
    font: {
      textAlign: "center",
      maxWidth: 200,
      fontWeight: 'bold'
    }
});
