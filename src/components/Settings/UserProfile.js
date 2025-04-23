import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserProfile = ({name, email, imageUrl, onEdit}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <MaterialIcons name="edit" size={20} color="#F83758" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#F83758',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F83758',
  },
});

export default memo(UserProfile);
