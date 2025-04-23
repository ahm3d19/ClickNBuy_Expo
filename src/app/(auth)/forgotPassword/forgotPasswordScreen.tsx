import { StyleSheet, Text, View } from "react-native";
import React from "react";

const forgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>forgotPasswordScreen</Text>
    </View>
  );
};

export default forgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
