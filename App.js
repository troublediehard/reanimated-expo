import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loop } from './src/Loop';
import { Opacity } from './src/Opacity';
import { TransitionLayout } from './src/transition/Transition'
import UseTransitions from './src/transition/useTransitions'
import LoadAssets from './src/components/LoadAssets';
import DarkMode from './src/DarkMode';
import Timing from './src/Timing';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf")
};


export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <View style={styles.container}>
        <Loop />
        {/*<Opacity />*/}
        {/*<TransitionLayout />*/}
        {/*<UseTransitions />*/}
        {/*<DarkMode />*/}
        {/*<Timing />*/}
      </View>
    </LoadAssets>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
