import React, { useState } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import patternImage from '../assets/patterns/pattern-K-100-white.png'
import { RectButton } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('window');
const patternSize = {
  height: 100,
  width: 100,
};

const widthCount = parseInt(Number(width / patternSize.width)) + 2;
const viewWidth = widthCount * patternSize.width;

console.warn(viewWidth, width)

const {
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  stopClock,
  interpolate,
  timing,
  Extrapolate,
  eq,
  and,
} = Animated;

const runTiming = (clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear,
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.position, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
    ]),
    state.position
  ])
};

export const Loop = () => {
  const [play, setPlay] = useState(false);

  const { progress, clock, isPlaying } = useMemoOne(
    () => ({
      progress: new Value(0),
      clock: new Clock(),
      isPlaying: new Value(0),
    }), []
  );

  useCode(
    block([
      cond(and(eq(isPlaying, 0), clockRunning(clock)), stopClock(clock)),
      cond(and(eq(isPlaying, 1), not(clockRunning(clock))), startClock(clock)),
      set(progress, runTiming(clock))
    ]),
    []
  );

  const transX = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, -patternSize.width],
    extrapolate: Extrapolate.CLAMP
  });

  const onPress = () => {
    setPlay(!play);
    isPlaying.setValue(play ? 0 : 1);
  };

  return (
    <View
      onPress={onPress}
    >
      <RectButton {...{ onPress }} >
        <SafeAreaView>
          <Text>Play / Pause</Text>
        </SafeAreaView>
      </RectButton>
      <Animated.View
        style={[styles.container, { transform: [{ translateX: transX }] }]}
      >
        <Image resizeMode={'repeat'} source={patternImage} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height,
    width: viewWidth,
    flexDirection: 'row',
  },
  image: {
    height,
    width: viewWidth,
    tintColor: '#3d99d1',
  },
});
