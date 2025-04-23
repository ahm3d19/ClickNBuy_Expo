import React, {memo} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const ProductImageGallery = ({imageUrl}) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: imageUrl}}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.imageIndicatorContainer}>
        {[1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={[
              styles.imageIndicator,
              index === 0 && styles.activeImageIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: width * 0.8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeImageIndicator: {
    width: 16,
    backgroundColor: '#F83758',
  },
});

export default memo(ProductImageGallery);
