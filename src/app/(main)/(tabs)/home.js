import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Components
import TopNavWithSearch from "../../../components/TopNavWithSearch";
import DiscountBanner from "../../../components/HomeScreen/DiscountBanner";
import ProductCard from "../../../components/HomeScreen/ProductCard";
import CategoryCard from "../../../components/HomeScreen/CategoryCard";
import FilterModal from "../../../components/HomeScreen/FilterModal";
import SectionHeader from "../../../components/HomeScreen/SectionHeader";
import NewArrivalsBanner from "../../../components/HomeScreen/NewArrivalsBanner";

// Constants
import { DISCOUNT_BANNERS, CATEGORIES } from "../../../constants/Constants";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("popular");
  const [activeDiscount, setActiveDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products on initial render
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Transform and memoize products data
  const transformedProducts = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      brand: product.category,
      category: product.category,
      description: product.description,
      price: product.price,
      originalPrice: (product.price * 1.3).toFixed(2),
      discount: `${Math.floor(Math.random() * 30) + 10}% Off`,
      rating: product.rating.rate,
      image: product.image,
    }));
  }, [products]);

  // Sort and filter products based on selected options
  const sortedAndFilteredProducts = useMemo(() => {
    const sorted = [...transformedProducts].sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return b.id - a.id;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transformedProducts, sortOption, searchQuery]);

  // Handle discount banner scroll
  const handleBannerScroll = useCallback((e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
    setActiveDiscount(index);
  }, []);

  // Loading state
  if (status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <TopNavWithSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <ActivityIndicator size="large" color="#F83758" style={styles.loader} />
      </SafeAreaView>
    );
  }

  // Error state
  if (status === "failed") {
    return (
      <SafeAreaView style={styles.container}>
        <TopNavWithSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavWithSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <Text style={styles.headerTitle}>All Featured</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <MaterialIcons name="filter-list" size={20} color="#333" />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Discount Banners Carousel */}
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={DISCOUNT_BANNERS}
          renderItem={({ item, index }) => (
            <DiscountBanner
              item={item}
              isActive={activeDiscount === index}
              onPress={() =>
                router.navigate("Products", { filter: "discount" })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          onMomentumScrollEnd={handleBannerScroll}
          contentContainerStyle={styles.discountBannersContainer}
        />

        {/* Deal of the Day */}
        <SectionHeader
          title="Deal of the Day"
          onViewAll={() => router.navigate("Products", { filter: "deal" })}
        />

        <FlatList
          horizontal
          data={sortedAndFilteredProducts.slice(0, 5)}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() =>
                // router.navigate("productDetail", { product: item })
                router.push({
                  pathname: "/productDetail",
                  params: { product: JSON.stringify(item) }
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productsContainer}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />

        {/* Categories */}
        <SectionHeader
          title="Shop by Category"
          onViewAll={() => router.navigate("Categories")}
        />

        <FlatList
          horizontal
          data={CATEGORIES}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              onPress={() =>
                router.navigate("CategoryProducts", { category: item.title })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={2}
        />

        {/* Trending Products */}
        <SectionHeader
          title="Trending Products"
          onViewAll={() => router.navigate("Products", { filter: "trending" })}
        />

        <FlatList
          horizontal
          data={[...sortedAndFilteredProducts].reverse().slice(0, 5)}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() =>
                // router.navigate('productDetail', {product: item})
                router.push({
                  pathname: "productDetail",
                  params: { product: JSON.stringify(item) },
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productsContainer}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
        />

        {/* New Arrivals */}
        <NewArrivalsBanner
          onPress={() => router.navigate("Products", { filter: "new" })}
        />
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        sortOption={sortOption}
        setSortOption={setSortOption}
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
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  filterButtonText: {
    marginLeft: 5,
    color: "#333",
    fontWeight: "500",
  },
  discountBannersContainer: {
    paddingHorizontal: 15,
  },
  productsContainer: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
});

export default HomeScreen;
