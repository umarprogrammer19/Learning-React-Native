import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Driver = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank You for Choosing Indrive</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen height
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: '#f0f0f0', // Optional background color
  },
  text: {
    fontSize: 20, // Size of the text
    fontWeight: 'bold', // Bold text
    color: '#333', // Text color
    textAlign: 'center', // Ensure text is centered
  },
});

export default Driver;
