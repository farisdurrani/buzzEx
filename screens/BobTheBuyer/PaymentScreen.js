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
import { COLORS, LAYOUT } from "../../constants";

const PaymentScreen = ({ navigation }) => {
  const itemPrice = 12.0;
  const deliveryFee = 2.31;
  const [tip, setTip] = useState("");

  const ItemDetailGroup = (props) => {
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

  const PriceItem = (props) => {
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

      <PriceItem itemName="ETA" price="14:55" />

      <View style={{ marginVertical: 20 }}>
        <PriceItem itemName="Item Price" price={`\$${itemPrice}`} />
        <PriceItem itemName="Delivery" price={`\$${deliveryFee}`} />
      </View>

      <ItemDetailGroup
        title="Add tip:"
        placeholder="$2.00"
        state={tip}
        setState={setTip}
      />

      <PriceItem
        itemName="Subtotal"
        price={
          !isNaN(tip)
            ? `\$${(itemPrice + deliveryFee + Number(tip)).toFixed(2)}`
            : `\$${itemPrice + deliveryFee}`
        }
        bold="bold"
      />

      <BButton
        text="Pay"
        containerStyle={{ width: 150, marginTop: 60 }}
        onPress={() => {
          navigation.navigate("MatchingDeliverer");
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
