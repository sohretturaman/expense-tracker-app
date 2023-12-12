/** @format */

import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors } from "../components/Colors";

const ErrorOverlay = ({ message, onPressError }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      <Pressable onPress={onPressError}>
        <Text style={styles.button}>Cancel</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10,
    color: "red",
    fontWeight: "bold",
  },
  button: {
    padding: 5,
    backgroundColor: "red",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ErrorOverlay;
