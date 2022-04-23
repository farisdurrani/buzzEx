import {StyleSheet, Text, View} from 'react-native'
import { BackCancelButtons } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'
import { BButton } from "../../components/index";


const SizeSelection = ({ navigation, route }) => {
  return (
    <View style= {styles.Maincontainer}>
        <BackCancelButtons style = {styles.backcancel} navigation={navigation} />
        <View  style={styles.containerText}>
        <Text  style={styles.selectionText}>Select Vehicle Type</Text>
        </View>
        <View style = {styles.container}>
            
            <View style = {styles.box}>
                <View style = {styles.inner}>
                <Icon size={80} name="bicycle"></Icon>
                <BButton
                    text="Confirm"
                    onPress={console.log("bike")}
                />
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                <Icon size={80} name="car-side"></Icon>
                <BButton
                    text="Confirm"
                    onPress={console.log("car")}
                />
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                <Icon size={80} name="truck-pickup"></Icon>
                <BButton
                    text="Confirm"
                    onPress={console.log("truck")}
                />
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                <Icon size={80} name="trailer"></Icon>
                <BButton
                    text="Confirm"
                    onPress={console.log("trailer")}
                />
                </View>
            </View>

        </View>
      </View>
    </View>
  );
};

export default SizeSelection;

const styles = StyleSheet.create({
  Maincontainer: {
    paddingTop: 30,
  },
  container: {
    width: "100%",
    height: "85%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 100,
  },

  box: {
    width: "50%",
    height: "50%",
    padding: 5,
    borderRadius: 30,
  },

  inner: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  backcancel: {},
});

    box: {
        width: "50%",
        height: "50%",
        padding:5,       
    },

    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectionText: {
        alignItems: 'center', 
        fontSize: 20,
        fontWeight: "bold",
    },
    containerText: {
        alignItems: 'center', 
    }
})


