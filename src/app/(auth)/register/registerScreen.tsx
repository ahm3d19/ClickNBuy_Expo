import { StyleSheet, Text, View } from "react-native";
import React from "react";

const registerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>registerScreen</Text>
    </View>
  );
};

export default registerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
