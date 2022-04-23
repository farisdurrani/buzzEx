import {StyleSheet, Text, View} from 'react-native'
import { BackCancelButtons } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'

const SizeSelection = ({ navigation, route }) => {
  return (
    <View style= {styles.Maincontainer}>
        <BackCancelButtons style = {styles.backcancel} navigation={navigation} />
        <View style = {styles.container}>
            
            <View style = {styles.box}>
                <View style = {styles.inner}>
                <Icon size={80} name="bicycle"></Icon>
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                </View>
            </View>

            <View style = {styles.box}>
                <View style = {styles.inner}>
                </View>
            </View>

        </View>
     </View>
  );
};

export default SizeSelection;

const styles = StyleSheet.create({

    Maincontainer:{
        paddingTop:30,

    },
    container: {
        width:'100%',
        height:'85%',
        padding:5,
        flexDirection:"row",
        flexWrap: 'wrap',
        paddingTop: 100,
    }, 

    box: {
        width: "50%",
        height: "50%",
        padding:5,
        borderRadius: 30,
        
    },

    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backcancel: {
    }
})

