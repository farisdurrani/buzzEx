import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";
import { Input, Button, Text, useTheme } from "react-native-elements";
import { BButton, BackCancelButtons } from "../../components";
import { COLORS, LAYOUT, roundTo2 } from "../../constants";
import { addTip, updateDeliveryStatus } from "../../firebase";

const PaymentScreen = ({ navigation, route }) => {
  const { deliveryRequests } = route.params;

  const itemPrice = deliveryRequests[0].data.package.base_price;
  const deliveryFee = deliveryRequests[0].data.package.delivery_fee;
  const [tip, setTip] = useState("");

  const _ItemDetailGroup = (props) => {
    const { title, placeholder, state, setState } = props;
    return (
      <View style={styles.tipContainer}>
        <Text style={styles.detailTitle}>{title}</Text>
        <KeyboardAvoidingView style={[styles.inputContainer]}>
          <TextInput
            style={styles.inputText}
            placeholder={placeholder}
            onEndEditing={(e) => {
              setState(e.nativeEvent.text);
            }}
            defaultValue={state}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

  const _PriceItem = (props) => {
    const { itemName, price, bold } = props;
    const stylesPI = StyleSheet.create({
      mainContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.transparent_gray,
        padding: 10,
        width: 300,
      },
      text: {
        fontWeight: bold ? "bold" : "normal",
        fontSize: 20,
      },
    });
    return (
      <View style={stylesPI.mainContainer}>
        <Text style={stylesPI.text}>{itemName}</Text>
        <Text style={stylesPI.text}>{price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <BackCancelButtons navigation={navigation} />

      <View style={{ marginTop: 70 }} />
      <Text style={styles.title}>Payment</Text>
      <_PriceItem itemName="ETA" price="14:55" />

      <View style={{ marginVertical: 20 }}>
        <_PriceItem itemName="Item Price" price={`\$${roundTo2(itemPrice)}`} />
        <_PriceItem itemName="Delivery" price={`\$${roundTo2(deliveryFee)}`} />
      </View>

      <_ItemDetailGroup
        title="Add tip:"
        placeholder="$2.00"
        state={tip}
        setState={setTip}
      />

      <_PriceItem
        itemName="Subtotal"
        price={
          !isNaN(tip)
            ? `\$${roundTo2(itemPrice + deliveryFee + Number(tip))}`
            : `\$${roundTo2(itemPrice + deliveryFee)}`
        }
        bold="bold"
      />

      <BButton
        text="Pay"
        containerStyle={{ width: 150, marginTop: 60 }}
        onPress={() => {
          const setPackageToReady = async () => {
            const new_package = await addTip(deliveryRequests[0].id, tip);
            await updateDeliveryStatus(deliveryRequests[0].id, 1, new_package);
            navigation.navigate("MatchingDeliverer");
          };
          setPackageToReady();
        }}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  tipContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    width: 300,
    alignItems: "center",
    marginBottom: 20,
  },
  inputContainer: {
    paddingHorizontal: 10,
    width: 150,
    paddingVertical: 8,
    backgroundColor: COLORS.transparent_gray,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 60,
  },
  detailTitle: {
    fontSize: 20,
  },
  inputText: {
    fontSize: 20,
    textAlign: "right",
  },
});
