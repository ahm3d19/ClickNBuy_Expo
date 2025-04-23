import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";

const OrderConfirmation = () => {
  const route = useRouter();
  const params = useLocalSearchParams();
  // const product = params.product ? JSON.parse(params.product) : null;
  const orderData = params.orderData ? JSON.parse(params.orderData) : null;
  console.log(orderData);
  // const {orderNumber, total, items} = params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.orderNumber}>Order #{orderData.orderNumber}</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {orderData.items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} x ${item.price}
              </Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${orderData.total}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => route.navigate("home")}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  summary: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F83758",
  },
  button: {
    backgroundColor: "#F83758",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderConfirmation;
