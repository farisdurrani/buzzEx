import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BButton, BackCancelButtons } from "../../components/index";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, LAYOUT, roundTo2 } from "../../constants";
import { getUserDetails } from "../../firebase";

const Accepted = ({ navigation, route }) => {
  const { senderItem, receiverItem, packageItem } = route.params;

  const [delivererItem, setDelivererItem] = useState({
    data: { full_name: "Loading...", email: "Loading..." },
  });

  useEffect(async () => {
    await getUserDetails(packageItem.data.deliverer_uid).then(
      (newDelivererItem) => {
        setDelivererItem(newDelivererItem);
        setTimeout(
          () =>
            navigation.replace("DelivererToPickup", {
              senderItem: senderItem,
              receiverItem: receiverItem,
              initPackageItem: packageItem,
              delivererItem: newDelivererItem,
            }),
          2000
        );
      }
    );
  }, []);

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <Text style={styles.mainText}>{`${
        delivererItem.data.full_name.split(" ")[0]
      } will be delivering your package!`}</Text>

      <Image
        source={require("../../assets/earth_face.png")}
        style={styles.profilePic}
      />
      <View style={LAYOUT.centerMiddle}>
        <Text style={styles.name}>{`${delivererItem.data.full_name}`}</Text>
        <Text style={styles.username}>{`${delivererItem.data.email}`}</Text>
      </View>

      <View style={[LAYOUT.row, { marginTop: 10 }]}>
        <AntDesign name="star" size={20} color={COLORS.primary_red} />
        <Text>{`${roundTo2(
          delivererItem.data.rating ? delivererItem.data.rating : 5.0
        )}`}</Text>
      </View>

      <View style={{ marginTop: 60 }}>
        <BButton
          text="Continue"
          onPress={() => {
            if (!delivererItem.id) {
              alert("Wait until deliverer has been verfied");
              return;
            }
            navigation.replace("DelivererToPickup", {
              senderItem: senderItem,
              receiverItem: receiverItem,
              initPackageItem: packageItem,
              delivererItem: delivererItem,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  upperButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  mainText: {
    marginTop: 50,
    fontSize: 40,
    textAlign: "center",
  },
  profilePic: {
    marginTop: 50,
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  name: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  username: {
    fontSize: 20,
    color: COLORS.primary_red,
  },
});

export default Accepted;
