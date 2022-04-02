import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Image,
    Dimensions
} from "react-native";
import { Input, Button, Text, useTheme } from 'react-native-elements';
import { BButton } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/Feather';
import MapComponent from "../../components/MapComponent";

let {width, height} = Dimensions.get('window') //Screen dimensions
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.04  // Controls the zoom level of the map. Smaller means more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO // Dependent on LATITUDE_DELTA

const DelivererToPickup = ({ route, navigation }) => {
    const [deliveryNotes, onAddDeliveryNotes] = useState("");
    const { mapProps } = route.params;
    const hasLocationData = mapProps.latitude !== null && mapProps.longitude !== null;
    return (
            <View style={styles.container}>
                
                <View style={styles.topleftbutton}>
                
                <TouchableOpacity onPress={navigation.goBack}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                
              </View>

            <View style={styles.headingContainer}>
                <Text style={styles.lineone}>ETA - 2:55</Text>
            </View>
            {hasLocationData ? 
                <MapComponent mapProps={{...mapProps, style: styles.map}}/>
                : <Text style={styles.paragraph}>Loading Map...</Text>}
            <View style={styles.bottomContainer}>
                <Text style={styles.linetwo}>Dan is on the way to pickup the delivery!</Text>
                <TextInput
                    placeholder="Any delivery notes?"
                    value={deliveryNotes}
                    onChangeText={onAddDeliveryNotes}
                ></TextInput>
                 <Icon.Button
                    name="phone"
                    backgroundColor="#000000"
                    onPress={() => navigation.navigate('DelivererToDropoff')}>
                </Icon.Button>
                <Button
                    onPress={() => navigation.navigate('DelivererToDropoff', {
                        mapProps: mapProps
                    })}
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
        fontSize: 30,
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
    buttonView: {
        position: "absolute",
        top: 5/6 * height
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
    headingContainer: {
        position: "absolute",
        top:50
    },
    bottomContainer: {
        position: "absolute",
        bottom:25
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
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 1/7 * height,
        bottom: 1/3 * height
      }
});
