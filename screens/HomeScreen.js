import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import axios from "axios";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import { auth } from "../firebase";
const HomeScreen = () => {
    const navigation = useNavigation();
    const [currentLocation, setCurrentLocation] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [latLong, setLatLong] = React.useState("");
    const [latitude, setLatitude] = React.useState("-1");
    const [longitude, setLongitude] = React.useState("-1");
    const [todayTemp, setTodayTemp] = React.useState("-1");
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleSignout = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch((error) => {
                setErrorMsg(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.locationInput}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />
            <Text style={styles.text}>
                Coordinates: {latitude}, {longitude}
            </Text>
            <Text style={styles.text}>Current temperature: {todayTemp} F</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (currentLocation.coords !== undefined) {
                        setLatitude(currentLocation.coords.latitude.toString());
                        setLongitude(
                            currentLocation.coords.longitude.toString()
                        );
                        setLocation("");
                        setErrorMsg("");
                    } else {
                        setErrorMsg("Loading... Click again.");
                    }
                }}
            >
                <Text style={styles.hyperlink}>Current location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignout}>
                <Text style={styles.hyperlink}>Sign out</Text>
            </TouchableOpacity>

            <Text style={styles.error}>{errorMsg}</Text>

            <Text style={styles.text}>{auth.currentUser?.email}</Text>
        </View>
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
        paddingVertical: 15,
    },
    text: {
        paddingVertical: 15,
    },
    error: {
        color: 'red',
    },
    hyperlink: {
        color: "blue",
    },
    locationInput: {
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
    },
});
