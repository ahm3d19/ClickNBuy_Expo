import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SectionHeader = ({title, onViewAll}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>View all →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    color: '#F83758',
    fontWeight: '600',
  },
});

export default memo(SectionHeader);
