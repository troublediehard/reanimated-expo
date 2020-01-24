import React, { useState, useMemo } from 'react';
import { Image, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import backImage from '../assets/bg.jpg';

const { height, width } = Dimensions.get('window');

const {
  Value,
  useCode,
  set,
  Clock,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  stopClock,
  add,
  interpolate,
  Extrapolate,
  eq,
  and,
} = Animated;
const duration = 2000;


export const Opacity = () => {
  const [play, setPlay] = useState(false);
  const { clock, time, progress } = useMemo(() => ({
    clock: new Clock(),
    time: new Value(0),
    progress: new Value(0),
  }));

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    block([
      cond(
        and(not(clockRunning(clock)), play),
        [startClock(clock), set(time, clock)],
      ),
      set(
        progress,
        interpolate(clock, {
          inputRange: [time, add(time, duration)],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP,
        })
      ),
      cond(eq(progress, 1), stopClock(clock))
    ]),
    [play],
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPlay(!play);
      }}
    >
      <Animated.View
        style={[styles.container, { opacity }]}
      >
        <Image resizeMode={'stretch'} source={backImage} style={styles.image} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height,
    width,
  },
  image: {
    height,
    width,
  },
});
