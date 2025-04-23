import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartItem = ({
  item,
  onRemoveItem,
  onAddItem,
  onDeleteItem,
  parsePrice,
}) => {
  const unitPrice = parsePrice(item.price);
  const totalPrice = item.totalPrice || unitPrice * item.quantity;

  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.image} />

      <View style={styles.details}>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.brand}>{item.brand}</Text>

          {item.selectedSize && (
            <Text style={styles.variant}>Size: {item.selectedSize}</Text>
          )}

          {item.selectedColor && (
            <View style={styles.colorContainer}>
              <Text style={styles.variant}>Color: </Text>
              <View
                style={[
                  styles.colorIndicator,
                  {backgroundColor: item.selectedColor},
                ]}
              />
            </View>
          )}

          <View style={styles.priceContainer}>
            <Text style={styles.unitPrice}>${unitPrice.toFixed(2)}</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={onRemoveItem}>
            <MaterialIcons name="remove" size={20} color="#F83758" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={onAddItem}>
            <MaterialIcons name="add" size={20} color="#F83758" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onDeleteItem}>
        <MaterialIcons name="delete" size={24} color="#F83758" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
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
  variant: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  unitPrice: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F83758',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
});

export default memo(CartItem);
