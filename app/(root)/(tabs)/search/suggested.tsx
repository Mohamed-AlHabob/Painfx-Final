import { DropdownMenu } from '@/components/ui/dropdown';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function page() {

  return (
    <DropdownMenu
    options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    ]}
    onSelect={(value) => console.log("Selected:", value)}
     placeholder="Choose an option"
   />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});

