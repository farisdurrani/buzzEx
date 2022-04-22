import {StyleSheet, Text, View} from 'react-native'

import React from 'react'

const sizeSelection = () => {
  return (
   <View style = {styles.container}>

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

        <View style = {styles.box}>
            <View style = {styles.inner}>
             </View>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'85%',
        padding:5,
        flexDirection:"row",
        flexWrap: 'wrap'
    }, 

    box: {
        width: "50%",
        height: "50%",
        padding:5,
        borderRadius: "30px",
        
    },

    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default sizeSelection