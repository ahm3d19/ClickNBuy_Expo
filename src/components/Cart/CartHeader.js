import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartHeader = ({onBack, onClearCart, hasItems}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Your Cart</Text>
      <TouchableOpacity onPress={onClearCart} disabled={!hasItems}>
        <Text style={[styles.clearText, !hasItems && styles.disabledText]}>
          Clear All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearText: {
    color: '#F83758',
    fontWeight: '500',
  },
  disabledText: {
    color: '#ccc',
  },
});

export default memo(CartHeader);
