import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SettingsOption from './SettingsOption';

const SettingsSection = ({title, icon, options}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color="#666" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.options}>
        {options.map((option, index) => (
          <SettingsOption
            key={`option-${index}`}
            title={option.title}
            icon={option.icon}
            component={option.component}
            action={option.action}
            isLast={index === options.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
  options: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default memo(SettingsSection);
