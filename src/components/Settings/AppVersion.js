import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';

const AppVersion = ({version}) => {
  return <Text style={styles.text}>Version {version}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default memo(AppVersion);
