import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function Conversation() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Conversation</Text>
        {/* Add your conversation UI components here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 