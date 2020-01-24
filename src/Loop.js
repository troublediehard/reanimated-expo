import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { loop, bInterpolate, runTiming } from 'react-native-redash';
import { useMemoOne } from 'use-memo-one';
import backImage from '../assets/bg.jpg';

const { height, width } = Dimensions.get('window');

const {
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  and,
  not,
  clockRunning,
  startClock,
  stopClock,
  interpolate,
} = Animated;


export const Loop = () => {
  const [play, setPlay] = useState(false);
  const { isPlaying, animation, clock } = useMemoOne(
    () => ({
      isPlaying: new Value(0),
      animation: new Value(0),
      clock: new Clock(),
    }), []
  );

  useCode(
    block([
      cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
      cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
      set(
        animation,
        loop({
          clock,
          duration: 2000,
          easing: Easing.linear,
          boomerang: false,
          autoStart: false,
        })
      ),
    ]),
    []
  );

  const transX = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, -width],

  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPlay(!play);
        isPlaying.setValue(play ? 0 : 1);
      }}
    >
      <Animated.View
        style={[styles.container, { transform: [{ translateX: transX }] }]}
      >
        <Image resizeMode={'contain'} source={backImage} style={styles.image} />
        <Image resizeMode={'contain'} source={backImage} style={styles.image} />
        {/*<Image resizeMode={'contain'} source={require('../asset/bg.jpg')} style={styles.image} />*/}
        {/*<Image resizeMode={'contain'} source={require('../asset/bg.jpg')} style={styles.image} />*/}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height,
    width: width * 2,
    flexDirection: 'row',
  },
  image: {
    height,
    width,
  },
});
