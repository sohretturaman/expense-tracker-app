/** @format */

import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { Colors } from "../Colors";

const CustomInput = ({ label, textInputProps }) => {
  const inputStyles = [styles.input];
  if (textInputProps && textInputProps.multiline) {
    inputStyles.push(styles.multiline);
  }
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputProps} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    padding: 5,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: Colors.purple,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  inputWrapper: {
    margin: 5,
  },
  multiline: {
    minHeight: 100,
    maxHeight: 300,
  },
});
