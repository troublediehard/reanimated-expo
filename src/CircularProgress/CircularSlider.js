import React from "react";
import { Dimensions, StyleSheet, View, PixelRatio } from "react-native";

import { StyleGuide } from "../components";
import CircularProgress from "./CircularProgress";

import Animated from 'react-native-reanimated';
import Cursor from './Cursor';
import CircularProgressSVG from './CircularProgressSVG';

const { PI } = Math;
const { width } = Dimensions.get("window");
const size = width - 32;
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: r * 2,
    height: r * 2
  }
});

const {
  Value,
  sub,
  cond,
  lessThan,
  add,
} = Animated;

export default () => {
  const start = new Value(0);
  const end = new Value(0);
  const theta = sub(cond(lessThan(start, end), end, add(2 * PI, end)), start);
  const rotate = sub(2 * PI, start);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ rotate }]}}>
          <CircularProgressSVG
            bg={StyleGuide.palette.background}
            fg={StyleGuide.palette.primary}
            strokeWidth={STROKE_WIDTH}
            {...{ r, theta }}
          />
        </Animated.View>
        <Cursor theta={start} size={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} />
        <Cursor theta={end} size={STROKE_WIDTH} r={r - STROKE_WIDTH / 2} />
      </View>
    </View>
  );
};
