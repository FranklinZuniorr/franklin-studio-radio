/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Main } from './src/screens/main';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/services/playback-service';

TrackPlayer.registerPlaybackService(() => PlaybackService);

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle={'light-content'} />
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
