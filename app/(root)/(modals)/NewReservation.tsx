import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function NewReservation() {
  const { doctorId } = useLocalSearchParams();
  const [reason, setReason] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Reservation</Text>
      <Text style={styles.label}>Doctor ID: {doctorId || 'Unknown'}</Text>
      <Text style={styles.label}>Select Date and Time:</Text>
      {Platform.OS === 'android' && (
        <Button title="Pick a Date" />
      )}
      <TextInput
        style={styles.input}
        placeholder="Reason for visit"
        value={reason}
        onChangeText={setReason}
        multiline
      />

      <Button title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
});
