import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Color from "color";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from 'react-native-reanimated';
import { bInterpolate, timing } from 'react-native-redash';

export const STROKE_WIDTH = 40;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const {
  multiply,
  sub,
} = Animated;

export default ({ color, size, progress, icon }) => {
  const r = (size - STROKE_WIDTH) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference =  r * 2 * Math.PI;
  // const alpha = bInterpolate(sub(1, progress), - Math.PI * 0.5, Math.PI * 2 + Math.PI * 0.5);
  const alpha = bInterpolate(progress, 0, Math.PI * 2);
  const strokeDashoffset = multiply(alpha, r);
  const backgroundColor = new Color(color).darken(0.9).string();

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          strokeWidth={STROKE_WIDTH}
          stroke={backgroundColor} {...{
          cx,
          cy,
          r
        }} />
        <AnimatedCircle
          stroke={color}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeLinecap="round"
          strokeWidth={STROKE_WIDTH}
          {...{
            strokeDashoffset,
            cx,
            cy,
            r
          }}
        />
      </Svg>
      <View style={styles.container}>
        <Icon name={icon} size={STROKE_WIDTH} color="black" style={{ top: -r }} />
      </View>
    </View>
  );
};
