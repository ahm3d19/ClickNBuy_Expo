import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductInfo = ({
  title,
  brand,
  description,
  price,
  originalPrice,
  discountPercentage,
  rating,
  reviewCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        <Text style={styles.originalPrice}>${originalPrice}</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>
            {discountPercentage}% OFF
          </Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <MaterialIcons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>
          {rating} ({reviewCount} reviews)
        </Text>
      </View>

      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productBrand}>Category: {brand}</Text>

      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>Bestseller</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.productDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F83758',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  tagContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE8E8',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 15,
  },
  tagText: {
    fontSize: 12,
    color: '#F83758',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default memo(ProductInfo);
