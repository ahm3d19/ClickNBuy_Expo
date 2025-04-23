import React, {memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const CheckoutButton = ({total, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
        <Text style={styles.subtext}>${total}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#F83758',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default memo(CheckoutButton);
