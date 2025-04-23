import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EmptyWishlist = ({onShop}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="favorite-border" size={60} color="#ccc" />
      <Text style={styles.text}>Your wishlist is empty</Text>
      <Text style={styles.subtext}>Save your favorite items here</Text>
      <TouchableOpacity style={styles.button} onPress={onShop}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#F83758',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default memo(EmptyWishlist);
