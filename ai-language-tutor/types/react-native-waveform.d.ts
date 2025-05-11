declare module 'react-native-waveform' {
  import { ViewStyle } from 'react-native';
  
  interface WaveformProps {
    waveform: number[];
    height: number;
    width: number;
    color?: string;
    backgroundColor?: string;
    style?: ViewStyle;
  }

  const Waveform: React.FC<WaveformProps>;
  export default Waveform;
} 