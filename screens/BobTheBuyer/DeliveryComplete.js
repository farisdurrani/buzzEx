<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT } from "../../constants";
=======
// import React, { useEffect, useState } from "react";
// import {
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   View,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Input, Button, Text, useTheme } from "react-native-elements";
// import { BButton } from "../../components/index";
// import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import MapComponent from "../../components/MapComponent";
// import * as Location from 'expo-location';
>>>>>>> f4fb55574409f81f631760eeb57cc6cc73cde3bd

// let {width, height} = Dimensions.get('window') //Screen dimensions
// const ASPECT_RATIO = width/height
// const LATITUDE_DELTA = 0.04  // Controls the zoom level of the map. Smaller means more zoomed in
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO // Dependent on LATITUDE_DELTA

<<<<<<< HEAD
     
=======
// const DeliveryComplete = ({ route, navigation }) => {
//   const { mapProps } = route.params;
//   const hasLocationData = mapProps.latitude !== null && mapProps.longitude !== null;
//   return (
//     <View style={styles.container}>
//       <View style={styles.topleftbutton}>
//         <TouchableOpacity onPress={navigation.goBack}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
>>>>>>> f4fb55574409f81f631760eeb57cc6cc73cde3bd

//       <View style={styles.toprightbutton}>
//         <TouchableOpacity onPress={() => navigation.navigate("CancelScreen")}>
//           <MaterialIcons name="cancel" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.heading}>
//         <Text h3> Delivery Complete!</Text>
//       </View>
      

<<<<<<< HEAD
      <Image
        source={require("../../assets/buzzExLogo.png")}
        style={{
          width: 150,
          height: 167,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 30,
        }}
      />

      

                <View style={{ width: "30%", marginBottom: 20 }}>
        <BButton
          text="Go Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View> 
    </View>
  );
};

export default DeliveryComplete;

const styles = StyleSheet.create({
  lineone: {
    paddingBottom: 50,
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
  linetwo: {
    paddingBottom: 25,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  linethree: {
    paddingBottom: 25,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
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
    borderColor: "rgba(0, 0, 0, .2)",
  },
  inputContainer: {},
  heading: {
    textAlign: "center",
    padding: 5,
  },
  font: {
    textAlign: "center",
    maxWidth: 200,
    fontWeight: "bold",
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
=======
//       {hasLocationData ? 
//       <MapComponent mapProps={mapProps}/>
//       : <Text style={styles.paragraph}>Loading Map...</Text>}
//       <View style={styles.buttonView}>
//         <Button
//           onPress={() => navigation.navigate("Home", {
//             mapProps: mapProps
//           })}
//           style={[styles.button, styles.buttonOutline]}
//           title="Go Home"
//           buttonStyle={{
//             borderRadius: 20,
//           }}
//           containerStyle={{
//             width: 200,
//             marginHorizontal: 50,
//             marginVertical: 5,
//           }}
//         ></Button>
//       </View>
//     </View>
//   );
// };

// export default DeliveryComplete;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     padding: 20,
//   },
//   buttonContainer: {},
//   buttonOutline: {},
//   buttonOutlineText: {},
//   buttonText: {
//     color: "blue",
//   },
//   buttonView: {
//     position: "absolute",
//     top: 5/6 * height
//   },
//   input: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: "rgba(0, 0, 0, .2)",
//   },
//   inputContainer: {},
//   heading: {
//     position: "absolute",
//     top:100
//   },
//   headingText: {
//     textAlign: "center",    
//   },
//   font: {
//     textAlign: "center",
//     maxWidth: 200,
//     fontWeight: "bold",
//   },
//   topleftbutton: {
//     position: "absolute",
//     left: 25,
//     top: 50,
//   },
//   toprightbutton: {
//     position: "absolute",
//     right: 25,
//     top: 50,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     top: 1/5 * height,
//     bottom: 1/6 * height
//   }
// });
>>>>>>> f4fb55574409f81f631760eeb57cc6cc73cde3bd
