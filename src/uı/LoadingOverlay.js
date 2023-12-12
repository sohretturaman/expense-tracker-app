/** @format */

import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LoadingOverlay;
