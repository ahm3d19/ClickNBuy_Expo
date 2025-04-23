import { useRouter } from "expo-router";
import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const SimilarProducts = ({ products, status, category, navigation }) => {
  const router = useRouter();
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.similarProductCard}
      onPress={() =>
        router.replace({
          pathname: "/productDetail",
          params: { product: JSON.stringify(item) },
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.similarProductImage}
        resizeMode="contain"
      />
      <Text style={styles.similarProductTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.similarProductPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>More from {category}</Text>

      {status === "loading" ? (
        <ActivityIndicator size="small" color="#F83758" />
      ) : products.length > 0 ? (
        <FlatList
          horizontal
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.similarProductsList}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      ) : (
        <Text style={styles.noProductsText}>
          No other products in this category
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  similarProductsList: {
    paddingLeft: 20,
  },
  similarProductCard: {
    width: 150,
    marginTop:10,
    marginBottom:10,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  similarProductImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
    // backgroundColor: "#f5f5f5",
  },
  similarProductTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  similarProductPrice: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#F83758",
  },
  noProductsText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginVertical: 20,
  },
});

export default memo(SimilarProducts);
