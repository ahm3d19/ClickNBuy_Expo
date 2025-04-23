import React, {memo} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';

const DiscountBanner = ({item, isActive, onPress}) => {
  return (
    <ImageBackground
      source={{uri: item.image}}
      style={[styles.banner, {opacity: isActive ? 1 : 0.6}]}
      imageStyle={styles.bannerImage}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Shop Now →</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: Dimensions.get('window').width - 30,
    height: 180,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bannerImage: {
    borderRadius: 12,
  },
  content: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#F83758',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default memo(DiscountBanner);
