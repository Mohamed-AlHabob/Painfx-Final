import { SegmentedControl } from '@/components/segmented-control';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const options = ['Light', 'Standard', 'Pro'];
const Palette = {
  baseGray05: '#E5E2DC',
  baseGray80: '#30302E',
  background: '#F1EEE8',
};
export default function page() {
  const [selectedOption, setSelectedOption] = useState('Standard');

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

