import { useNetworkStatus } from '@/core/utils/network';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NetworkStatusBanner = () => {
  const isOnline = useNetworkStatus();

  if (isOnline === null) return null; // Don't show anything if status is unknown

  return (
    <View style={[styles.banner, { backgroundColor: isOnline ? '#4CAF50' : '#F44336' }]}>
      <Text style={styles.text}>
        {isOnline ? 'You are online' : 'You are offline'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NetworkStatusBanner;