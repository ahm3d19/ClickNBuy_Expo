import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slices/wishlistSlice";
import { fetchSimilarProducts } from "../../../redux/slices/similarProductsSlice";

// Components
import ProductHeader from "../../../components/ProductDetail/ProductHeader";
import ProductImageGallery from "../../../components/ProductDetail/ProductImageGallery";
import ProductInfo from "../../../components/ProductDetail/ProductInfo";
import ProductVariants from "../../../components/ProductDetail/ProductVariants";
import SimilarProducts from "../../../components/ProductDetail/SimilarProducts";
import AddToCartButton from "../../../components/ProductDetail/AddToCartButton";
import SuccessModal from "../../../components/ProductDetail/SuccessModal";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const ProductDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  // const route = useRoute();
  const dispatch = useDispatch();
  // const { product } = route.params;
  const product = params.product ? JSON.parse(params.product) : null;

  // State
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#FF5252");
  const [quantity, setQuantity] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Redux state
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { items: similarProducts, status } = useSelector(
    (state) => state.similarProducts
  );
  const isInWishlist = useMemo(
    () => wishlistItems.some((item) => item.id === product.id),
    [wishlistItems, product.id]
  );

  // Calculate pricing
  const { originalPrice, discountPercentage } = useMemo(() => {
    const originalPrice = (product.price * 1.3).toFixed(2);
    const discountPercentage = Math.floor(
      (1 - product.price / originalPrice) * 100
    );
    return { originalPrice, discountPercentage };
  }, [product.price]);

  // Fetch similar products
  useEffect(() => {
    dispatch(
      fetchSimilarProducts({
        category: product.category,
        excludeId: product.id,
      })
    );
  }, [dispatch, product.category, product.id]);

  // Handlers
  const handleAddToCart = useCallback(() => {
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
      totalPrice: product.price * quantity,
    };
    dispatch(addItemToCart(cartItem));
    setShowSuccessModal(true);
  }, [dispatch, product, quantity, selectedColor, selectedSize]);

  const toggleWishlist = useCallback(() => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  }, [dispatch, isInWishlist, product]);

  const handleViewCart = useCallback(() => {
    setShowSuccessModal(false);
    router.navigate("cart");
  }, [router]);

  const handleContinueShopping = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ProductHeader
          onBack={() => router.back()}
          onWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />

        <ProductImageGallery imageUrl={product.image} />

        <ProductInfo
          title={product.title}
          brand={product.category}
          description={
            product.description || "No description available for this product."
          }
          price={product.price}
          originalPrice={originalPrice}
          discountPercentage={discountPercentage}
          rating={product.rating?.rate || 4.5}
          reviewCount={product.rating?.count || 120}
        />

        <ProductVariants
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <SimilarProducts
          products={similarProducts}
          status={status}
          category={product.category}
          navigation={router}
        />
      </ScrollView>

      <AddToCartButton
        price={product.price}
        quantity={quantity}
        onPress={handleAddToCart}
      />

      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        productTitle={product.title}
        quantity={quantity}
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
  scrollView: {
    flex: 1,
    marginBottom: 80,
  },
});

export default ProductDetailScreen;
