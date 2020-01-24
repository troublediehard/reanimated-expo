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


  return (
    <TouchableWithoutFeedback

    >
      <Animated.View
        style={[styles.container, {  }]}
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
