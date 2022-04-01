import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View, Button } from 'react-native';
const ContactScreen = ({ navigation }) => {
  const Favorites = [{
    title: "Favorites",
    data: [
        {
            id: "1",
            name: "Aaron" + "\n" + "@Aaron"
          },
          {
            id: "2",
            name: "Adam" + "\n" + "@Adam"
          },
          {
            id: "3",
            name: "Ben" + "\n" + "@Ben"
          },
          {
            id: "4",
            name: "Bob" + "\n" + "@BobTheBuyer"
          },
          {
            id: "5",
            name: "Brandon" + "\n" + "@Brandon"
          },
          {
            id: "6",
            name: "Bryan" + "\n" + "@Bryan"
          },
    ]
  }];
  const YourContacts = [{
    title: "Your Contacts",
    data: [
        {
            id: "7",
            name: "Sam" + "\n" + "@Sam"
          },
          {
            id: "8",
            name: "Sean" + "\n" + "@SeanSeller"
          },
          {
            id: "9",
            name: "Shane" + "\n" + "@Shane"
          },
          {
            id: "11",
            name: "Theo" + "\n" + "@Theo"
          },
          {
            id: "12",
            name: "Tom" + "\n" + "@Tom"
          },
          {
            id: "13",
            name: "Zack" + "\n" + "@Zack"
          },
      

    ]
  }];
  return (
    <View style={styles.container}>
      <SectionList
        sections={[...Favorites, ...YourContacts]}
        renderItem={({item})=> {
          return (<Button
              onPress={()=>{navigation.navigate("ItemPrice")}}
              // style={[styles.button, styles.buttonOutline]}
              title={item.name}
              buttonStyle={{
                borderRadius: 20,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 5,
              }}
          ></Button>)
            }}
        renderSectionHeader={({section})=>(
          <Text style={styles.Title}>{section.title}</Text>
        )}
        keyExtractor={item=>item.id}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  name:{
    padding: 10,
    marginVertical: 10,
    fontSize: 18
    
  },
  Title:{
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    marginTop: 40,
    marginBottom: 0,
    borderRadius: 10,
    color: "#a40e4c"
  }
});

