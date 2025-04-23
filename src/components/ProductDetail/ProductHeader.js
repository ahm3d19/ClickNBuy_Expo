import React, {memo} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductHeader = ({onBack, onWishlist, isInWishlist}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onWishlist}>
        <MaterialIcons
          name={isInWishlist ? 'favorite' : 'favorite-border'}
          size={24}
          color={isInWishlist ? '#F83758' : '#000'}
        />
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
  },
});

export default memo(ProductHeader);
