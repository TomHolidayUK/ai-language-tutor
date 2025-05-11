import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View as RNView } from 'react-native';
import { Audio } from 'expo-av';
import { Text, View } from './Themed';

export default function SpeechFeedback() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingStatus('Recording...');
      setRecordingDuration(0);
    } catch (err) {
      console.error('Failed to start recording', err);
      setRecordingStatus('Failed to start recording');
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      setRecordingStatus('Recording saved!');
      setAudioUri(uri);
      console.log('Recording saved at:', uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
      setRecordingStatus('Failed to save recording');
    }
  }

  async function playRecording() {
    if (!audioUri) return;

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error('Failed to play recording', err);
      setRecordingStatus('Failed to play recording');
    }
  }

  async function stopPlayback() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Speech Feedback</Text>
        
        <TouchableOpacity 
          style={[styles.recordButton, isRecording && styles.recordingActive]} 
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>

        {audioUri && (
          <RNView style={styles.playbackContainer}>
            <TouchableOpacity 
              style={[styles.playButton, isPlaying && styles.playingActive]} 
              onPress={isPlaying ? stopPlayback : playRecording}
            >
              <Text style={styles.playButtonText}>
                {isPlaying ? 'Stop' : 'Play'}
              </Text>
            </TouchableOpacity>

            <RNView style={styles.audioVisualizer}>
              {Array.from({ length: 20 }).map((_, index) => (
                <RNView
                  key={index}
                  style={[
                    styles.visualizerBar,
                    { height: isPlaying ? Math.random() * 40 + 10 : 10 }
                  ]}
                />
              ))}
            </RNView>
          </RNView>
        )}

        {recordingStatus ? (
          <Text style={styles.statusText}>{recordingStatus}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  recordingActive: {
    backgroundColor: '#44ff44',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  playingActive: {
    backgroundColor: '#ff4444',
  },
  playButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  audioVisualizer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  visualizerBar: {
    width: 4,
    backgroundColor: '#4CAF50',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  statusText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
}); 