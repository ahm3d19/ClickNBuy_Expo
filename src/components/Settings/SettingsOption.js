import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingsOption = ({title, icon, component, action, isLast}) => {
  return (
    <TouchableOpacity
      style={[styles.container, !isLast && styles.borderBottom]}
      onPress={action}
      disabled={!action}>
      <View style={styles.left}>
        <MaterialIcons name={icon} size={24} color="#666" />
        <Text style={styles.text}>{title}</Text>
      </View>
      {component || (
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default memo(SettingsOption);
