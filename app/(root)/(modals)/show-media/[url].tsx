import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ShowMedia() {
  const { url } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: decodeURIComponent(url) }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
