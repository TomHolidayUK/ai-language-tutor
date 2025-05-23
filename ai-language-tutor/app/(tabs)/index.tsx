import React from 'react';
import { StyleSheet } from 'react-native';
import SpeechFeedback from '../../components/SpeechFeedback';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return <SpeechFeedback />;
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
