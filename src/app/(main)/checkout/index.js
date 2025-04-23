import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const CheckoutScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { items, totalAmount } = cart;

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  // Helper function to parse price
  const parsePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("$", "")) || 0;
    }
    return price || 0;
  };

  // Calculate order total
  const calculateTotal = () => {
    const subtotal = parsePrice(totalAmount);
    const shipping = 5.99;
    const tax = subtotal * 0.1;
    return (subtotal + shipping + tax).toFixed(2);
  };

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert("Error", "Please enter your address");
      return false;
    }
    if (!formData.city.trim()) {
      Alert.alert("Error", "Please enter your city");
      return false;
    }
    if (!formData.zipCode.trim()) {
      Alert.alert("Error", "Please enter your ZIP code");
      return false;
    }
    if (!formData.country.trim()) {
      Alert.alert("Error", "Please enter your country");
      return false;
    }

    if (paymentMethod === "card") {
      if (
        !formData.cardNumber.trim() ||
        formData.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        Alert.alert("Error", "Please enter a valid 16-digit card number");
        return false;
      }
      if (!formData.cardName.trim()) {
        Alert.alert("Error", "Please enter the name on card");
        return false;
      }
      if (
        !formData.expiryDate.trim() ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)
      ) {
        Alert.alert("Error", "Please enter a valid expiry date (MM/YY)");
        return false;
      }
      if (!formData.cvv.trim() || formData.cvv.length !== 3) {
        Alert.alert("Error", "Please enter a valid 3-digit CVV");
        return false;
      }
    }

    return true;
  };

  const orderData = {
    orderNumber: `#${Math.floor(100000 + Math.random() * 900000)}`,
    total: calculateTotal(),
    items: items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: parsePrice(item.price).toFixed(2),
    })),
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart on success
      dispatch(clearCart());

      // Navigate to confirmation
      router.replace({
        pathname: "orderConfirmation",
        params: {orderData: JSON.stringify(orderData)},
      });
    } catch (error) {
      Alert.alert("Error", "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format card number for display
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Shipping Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>
            <View style={styles.inputRow}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange("firstName", text)}
                  placeholder="John"
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange("lastName", text)}
                  placeholder="Doe"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                placeholder="+1 234 567 8900"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                placeholder="123 Main St"
              />
            </View>

            <View style={styles.inputRow}>
              <View
                style={[styles.inputContainer, { flex: 2, marginRight: 10 }]}
              >
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  style={styles.input}
                  value={formData.city}
                  onChangeText={(text) => handleInputChange("city", text)}
                  placeholder="New York"
                />
              </View>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}
              >
                <Text style={styles.inputLabel}>Postal Code</Text>
                <TextInput
                  style={styles.input}
                  value={formData.zipCode}
                  onChangeText={(text) => handleInputChange("zipCode", text)}
                  placeholder="10001"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.input}
                value={formData.country}
                onChangeText={(text) => handleInputChange("country", text)}
                placeholder="United States"
              />
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "card" && styles.paymentMethodActive,
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <MaterialIcons
                name={
                  paymentMethod === "card"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#F83758"
              />
              <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "paypal" && styles.paymentMethodActive,
              ]}
              onPress={() => setPaymentMethod("paypal")}
            >
              <MaterialIcons
                name={
                  paymentMethod === "paypal"
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#F83758"
              />
              <Text style={styles.paymentMethodText}>PayPal</Text>
            </TouchableOpacity>

            {paymentMethod === "card" && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.cardNumber}
                    onChangeText={(text) =>
                      handleInputChange("cardNumber", formatCardNumber(text))
                    }
                    placeholder="1234 5678 9012 3456"
                    keyboardType="number-pad"
                    maxLength={19}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Name on Card</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.cardName}
                    onChangeText={(text) => handleInputChange("cardName", text)}
                    placeholder="John Doe"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View
                    style={[
                      styles.inputContainer,
                      { flex: 1, marginRight: 10 },
                    ]}
                  >
                    <Text style={styles.inputLabel}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.expiryDate}
                      onChangeText={(text) =>
                        handleInputChange("expiryDate", text)
                      }
                      placeholder="MM/YY"
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                  <View style={[styles.inputContainer, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.cvv}
                      onChangeText={(text) => handleInputChange("cvv", text)}
                      placeholder="123"
                      keyboardType="number-pad"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            {items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderItemInfo}>
                  <Text style={styles.orderItemName}>{item.title}</Text>
                  <Text style={styles.orderItemQuantity}>x{item.quantity}</Text>
                </View>
                <Text style={styles.orderItemPrice}>
                  ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                ${parsePrice(totalAmount).toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>$5.99</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>
                ${(parsePrice(totalAmount) * 0.1).toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${calculateTotal()}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Checkout Button */}
        <View style={styles.checkoutButtonContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.checkoutButtonText}>Processing...</Text>
            ) : (
              <>
                <Text style={styles.checkoutButtonText}>Place Order</Text>
                <Text style={styles.checkoutButtonSubtext}>
                  ${calculateTotal()}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentMethodActive: {
    backgroundColor: "#f9f9f9",
  },
  paymentMethodText: {
    fontSize: 16,
    marginLeft: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  orderItemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderItemName: {
    fontSize: 14,
    marginRight: 10,
  },
  orderItemQuantity: {
    fontSize: 12,
    color: "#888",
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
  },
  totalRow: {
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
  checkoutButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    backgroundColor: "#F83758",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButtonSubtext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CheckoutScreen;
