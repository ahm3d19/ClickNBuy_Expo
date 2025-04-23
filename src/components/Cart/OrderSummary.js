import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OrderSummary = ({subtotal, shipping, tax, total}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal:</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Shipping:</Text>
        <Text style={styles.value}>${shipping.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax:</Text>
        <Text style={styles.value}>${tax.toFixed(2)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F83758',
  },
});

export default memo(OrderSummary);
