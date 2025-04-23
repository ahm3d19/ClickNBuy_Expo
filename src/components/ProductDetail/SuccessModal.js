import React, {memo} from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SuccessModal = ({
  visible,
  onClose,
  productTitle,
  quantity,
  onViewCart,
  onContinueShopping,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialIcons name="check-circle" size={50} color="#4CAF50" />
            <Text style={styles.title}>Item Added to Cart!</Text>
          </View>

          <Text style={styles.text}>
            {quantity} {productTitle} has been added to your shopping cart.
          </Text>

          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.continueButton]}
              onPress={onContinueShopping}>
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.viewCartButton]}
              onPress={onViewCart}>
              <Text style={styles.viewCartButtonText}>View Cart</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: '#f5f5f5',
  },
  continueButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewCartButton: {
    backgroundColor: '#F83758',
  },
  viewCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(SuccessModal);
