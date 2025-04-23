import React, {memo} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const CategoryCard = ({item, onPress}) => {
  return (
    <ImageBackground
      source={{uri: item.image}}
      style={styles.banner}
      imageStyle={styles.bannerImage}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Explore Now →</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: 200,
    height: 120,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bannerImage: {
    borderRadius: 10,
  },
  content: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#F83758',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default memo(CategoryCard);
