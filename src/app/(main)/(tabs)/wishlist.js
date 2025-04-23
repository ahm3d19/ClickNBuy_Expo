import React, { useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/slices/wishlistSlice";
import { addItemToCart } from "../../../redux/slices/cartSlice";

// Components
import WishlistHeader from "../../../components/Wishlist/WishlistHeader";
import EmptyWishlist from "../../../components/Wishlist/EmptyWishlist";
import WishlistItem from "../../../components/Wishlist/WishlistItem";
import SuccessModal from "../../../components/ProductDetail/SuccessModal"; // Import the shared modal
import { useRouter } from "expo-router";

const WishlistScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
      totalPrice: product.price * quantity,
    };
    dispatch(addItemToCart(cartItem));
    setAddedProduct(product);
    setShowSuccessModal(true);
  };

  const handleViewCart = () => {
    setShowSuccessModal(false);
    router.navigate("cart");
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
  };

  const renderWishlistItem = ({ item }) => (
    <WishlistItem
      item={item}
      // onPress={() => router.navigate('productDetail', {product: item})}
      onPress={() =>
        router.push({
          pathname: "/productDetail",
          params: { product: JSON.stringify(item) },
        })
      }
      onAddToCart={() => handleAddToCart(item)}
      onRemove={() => handleRemoveFromWishlist(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <WishlistHeader onBack={() => router.back()} />

      {wishlistItems.length === 0 ? (
        <EmptyWishlist onShop={() => router.navigate("home")} />
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Reusing the SuccessModal component */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        productTitle={addedProduct?.title || ""}
        quantity={1}
        onViewCart={handleViewCart}
        onContinueShopping={handleContinueShopping}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:10,
  },
  listContent: {
    paddingHorizontal: 15,
  },
});

export default WishlistScreen;
