import React, {memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LogoutButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <MaterialIcons name="logout" size={24} color="#F83758" />
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    marginTop: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F83758',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F83758',
    marginLeft: 10,
  },
});

export default memo(LogoutButton);
