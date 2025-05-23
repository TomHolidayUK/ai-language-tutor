import React from 'react';
import { StyleSheet } from 'react-native';
import Conversation from '../../components/Conversation';

export default function TabTwoScreen() {
  return <Conversation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}); 