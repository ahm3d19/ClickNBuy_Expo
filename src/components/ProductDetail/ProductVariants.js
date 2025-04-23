import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductVariants = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
}) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['#FF5252', '#4CAF50', '#2196F3', '#9E9E9E'];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              size === selectedSize && styles.selectedSizeButton,
            ]}
            onPress={() => setSelectedSize(size)}>
            <Text
              style={[
                styles.sizeText,
                size === selectedSize && styles.selectedSizeText,
              ]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Color</Text>
      <View style={styles.colorContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              {backgroundColor: color},
              color === selectedColor && styles.selectedColorButton,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <MaterialIcons name="remove" size={20} color="#F83758" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}>
          <MaterialIcons name="add" size={20} color="#F83758" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedSizeButton: {
    borderColor: '#F83758',
    backgroundColor: '#FFE8E8',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeText: {
    color: '#F83758',
    fontWeight: 'bold',
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: '#F83758',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
  },
});

export default memo(ProductVariants);
