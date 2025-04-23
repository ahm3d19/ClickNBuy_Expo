import React from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  deleteItemFromCart,
  clearCart,
  addItemToCart,
} from "../../../redux/slices/cartSlice";

// Components
import CartHeader from "../../../components/Cart/CartHeader";
import EmptyCart from "../../../components/Cart/EmptyCart";
import CartItem from "../../../components/Cart/CartItem";
import OrderSummary from "../../../components/Cart/OrderSummary";
import CheckoutButton from "../../../components/Cart/CheckoutButton";
import { useRouter } from "expo-router";

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { items, totalAmount } = cart;

  // Helper function to parse price string (e.g., "$19.99" => 19.99)
  const parsePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("$", "")) || 0;
    }
    return price || 0;
  };

  const handleCheckout = () => {
    router.navigate("checkout");
  };

  const calculateTotal = () => {
    const subtotal = parsePrice(totalAmount);
    const shipping = 5.99;
    const tax = subtotal * 0.1;
    return (subtotal + shipping + tax).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onRemoveItem={() => dispatch(removeItemFromCart(item.id))}
      onAddItem={() => dispatch(addItemToCart(item))}
      onDeleteItem={() => dispatch(deleteItemFromCart(item.id))}
      parsePrice={parsePrice}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <CartHeader
          onBack={() => router.back()}
          onClearCart={() => dispatch(clearCart())}
          hasItems={items.length > 0}
        />

        {items.length === 0 ? (
          <EmptyCart
            onContinueShopping={() => router.replace("home")}
          />
        ) : (
          <>
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.cartItemsContainer}
              style={styles.itemsList}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              windowSize={5}
            />

            <OrderSummary
              subtotal={parsePrice(totalAmount)}
              shipping={5.99}
              tax={parsePrice(totalAmount) * 0.1}
              total={calculateTotal()}
            />

            <CheckoutButton total={calculateTotal()} onPress={handleCheckout} />
          </>
        )}
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
    marginBottom: 80,
  },
  itemsList: {
    flex: 1,
  },
  cartItemsContainer: {
    paddingBottom: 20,
  },
});

export default CartScreen;
