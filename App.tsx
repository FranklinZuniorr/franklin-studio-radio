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
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from './src/interfaces';
import { ENUM_SCREENS_NAMES } from './src/constants';
import { ListLinks } from './src/screens/list-links';
import Toast from 'react-native-toast-message';

TrackPlayer.registerPlaybackService(() => PlaybackService);
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={false} barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name={ENUM_SCREENS_NAMES.MAIN}
          component={Main}
          options={{ headerShown: false }}
          />
          <Stack.Screen
          name={ENUM_SCREENS_NAMES.LIST_LINKS}
          component={ListLinks}
          options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
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
