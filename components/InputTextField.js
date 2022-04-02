import React from "react";
import { COLORS, LAYOUT } from "../constants";
import { StyleSheet, KeyboardAvoidingView, TextInput } from "react-native";

const InputTextField = (props) => {
  const { placeholder, textState, setTextState, textStyle, containerStyle } =
    props;
  return (
    <KeyboardAvoidingView
      style={[
        containerStyle ? containerStyle : styles.inputContainer,
        LAYOUT.centerMiddle,
      ]}
    >
      <TextInput
        style={textStyle ? textStyle : styles.inputText}
        placeholder={placeholder}
        onEndEditing={(e) => {
          setTextState(e.nativeEvent.text);
        }}
        defaultValue={textState}
      />
    </KeyboardAvoidingView>
  );
};

export default InputTextField;

const styles = StyleSheet.create({
  inputText: {
    fontSize: 20,
  },
  inputContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent_gray,
  },
});
