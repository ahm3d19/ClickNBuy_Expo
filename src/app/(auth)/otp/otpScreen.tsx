import { StyleSheet, Text, View } from "react-native";
import React from "react";

const otpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>otpScreen</Text>
    </View>
  );
};

export default otpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
