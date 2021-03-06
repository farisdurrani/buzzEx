import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import SectionListContacts from "react-native-sectionlist-contacts";
import { registerRootComponent } from "expo";
import { COLORS, LAYOUT } from "../../constants";
// import SearchBar from "react-native-dynamic-search-bar";
import { getAllUsers, getUserDetails, getCurrentUser } from "../../firebase";

const Contacts = ({ navigation }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [senderItem, setSenderItem] = useState();
  const [nameData, setNameData] = useState([]);

  const currentUser = getCurrentUser();

  React.useEffect(async () => {
    const userSenderItem = await getUserDetails(currentUser.uid);
    setSenderItem(userSenderItem);
    const senderData = userSenderItem.data;
    const current_name = senderData.full_name;
    setCurrentUserName(current_name);
    const allUsersData = await getAllUsers();
    const allUsersDataNames = [];
    allUsersData.forEach((e) => {
      const split_name = e.data.full_name.split(" ");
      if (e.data.user_type === "Buyer/Seller") {
        allUsersDataNames.push({
          name: split_name[0],
          firstname: split_name[0],
          lastname: split_name[split_name.length - 1],
          fullname: e.data.full_name,
          uid: e.data.uid,
          email: e.data.email,
          address: e.data.address,
          receiverItem: e,
        });
      }
    });
    allUsersDataNames.sort((a, b) => a.fullname.localeCompare(b.fullname));
    setNameData(allUsersDataNames);
  }, []);

  const _renderHeader = (params) => {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.sectionText}>{params.key}</Text>
      </View>
    );
  };

  const _renderItem = (item, index, section) => {
    return (
      <View style={styles.itemView}>
        <View style={styles.itemTextView}>
          <Button
            title={item.fullname}
            onPress={() => {
              navigation.navigate("ItemPrice", {
                senderItem: senderItem,
                receiverItem: item.receiverItem,
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 200, backgroundColor: "#FFFFFF" }}>
        <View style={styles.headerView}>
          <Button title="Home" onPress={() => navigation.replace("Home")} />
        </View>
        <View style={styles.headerContactsView}>
          <Text style={styles.headerContacts}>Contacts</Text>
        </View>
      </View>
      <View
        style={{
          height: 80,
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../assets/images/defaultUser.jpeg")}
          style={styles.avatar}
        />
        <View
          style={{
            marginLeft: 15,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={styles.accountText}>{`${currentUserName}`}</Text>
          <Text style={styles.introText}>My Card</Text>
        </View>
      </View>
      <View style={styles.container}>
        <SectionListContacts
          sectionListData={nameData}
          initialNumToRender={nameData.length}
          otherAlphabet="#"
          renderHeader={_renderHeader}
          renderItem={_renderItem}
          letterViewStyle={styles.letterView}
          letterTextStyle={styles.letterText}
        />
      </View>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerView: {
    height: 44,
    marginTop: 44,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  groupsText: {
    fontSize: 17,
    color: "#000000",
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  headerContactsView: {
    height: 41,
    marginTop: 12,
    marginLeft: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  headerContacts: {
    fontSize: 34,
    color: "#000000",
    letterSpacing: -0.41,
    lineHeight: 41,
  },
  searchBox: {
    marginTop: 12,
    height: 37,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    backgroundColor: "#2C2C2E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputText: {
    fontSize: 17,
    color: "#8E8E93",
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  avatar: {
    width: 75,
    height: 100,
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 16,
  },
  accountText: {
    fontSize: 20,
    color: "#000000",
    letterSpacing: 0.38,
  },
  introText: {
    fontSize: 13,
    color: "#000000",
    letterSpacing: 0.38,
    lineHeight: 18,
  },
  sectionView: {
    height: 28,
    backgroundColor: "#D3D3D3",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sectionText: {
    marginLeft: 16,

    fontSize: 17,
    color: "#000000",
  },
  itemView: {
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  itemTextView: {
    height: 44,
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  itemFirstName: {
    fontSize: 17,
    color: "#000000",
  },
  itemLastName: {
    marginLeft: 5,

    fontSize: 17,
    color: "#000000",
  },
  letterText: {
    fontSize: 11,
    color: "#ffffff",
  },
  button: {
    backgroundColor: COLORS.primary_blue,
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const nameDataArchive = [
  {
    name: "Anderson",
    firstname: "Bill",
    lastname: "Anderson",
    fullname: "Bill Anderson",
  },
  {
    name: "Aaron",
    firstname: "Milton",
    lastname: "Aaron",
    fullname: "Milton Aaron",
  },
  {
    name: "Alex",
    firstname: "Michale",
    lastname: "Alex",
    fullname: "Michale Alex",
  },
  {
    name: "Baarda",
    firstname: "Will",
    lastname: "Baarda",
    fullname: "Will Baarda",
  },
  {
    name: "Ballard",
    firstname: "Bruce",
    lastname: "Ballard",
    fullname: "Bruce Ballard",
  },
  {
    name: "Barlow",
    firstname: "Michael",
    lastname: "Barlow",
    fullname: "Michael Barlow",
  },
  {
    name: "Haro",
    firstname: "Anna",
    lastname: "Haro",
    fullname: "Anna Haro",
  },
  {
    name: "Calvin",
    firstname: "David",
    lastname: "Calvin",
    fullname: "David Calvin",
  },
  {
    name: "David",
    firstname: "Carl",
    lastname: "David",
    fullname: "Carl David",
  },
  {
    name: "Elaine",
    firstname: "Mary",
    lastname: "Elaine",
    fullname: "Mary Elaine",
  },
  {
    name: "Felix",
    firstname: "David",
    lastname: "Felix",
    fullname: "David Felix",
  },
];
