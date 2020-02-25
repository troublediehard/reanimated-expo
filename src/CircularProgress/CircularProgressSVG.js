import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { PI } = Math;

const {
  Value,
  multiply,
} = Animated;

export default ({ theta, r, bg, fg, strokeWidth }) => {
  const radius = r - strokeWidth / 2;
  const circumference = 2 * PI * radius;
  const strokeDashoffset = multiply(theta, radius);
  const strokeDasharray = `${circumference}, ${circumference}`;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={bg}
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={fg}
        r={radius}
        {...{ strokeWidth, strokeDashoffset, strokeDasharray }}
      />
    </Svg>
  );
};
