import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WishlistItem = ({item, onPress, onAddToCart, onRemove}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: item.image}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartButton} onPress={onAddToCart}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <MaterialIcons name="delete" size={20} color="#F83758" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F83758',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#F83758',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 15,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 8,
  },
});

export default memo(WishlistItem);
