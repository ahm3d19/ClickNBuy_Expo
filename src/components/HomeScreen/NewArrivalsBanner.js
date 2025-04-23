import React, {memo} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const NewArrivalsBanner = ({onPress}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
        }}
        style={styles.background}
        imageStyle={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>New Arrivals</Text>
          <Text style={styles.subtitle}>Summer '25 Collections</Text>
          <Text style={styles.discount}>Up to 50% Off</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>View all →</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 12,
  },
  content: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F83758',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#F83758',
    fontWeight: 'bold',
  },
});

export default memo(NewArrivalsBanner);
