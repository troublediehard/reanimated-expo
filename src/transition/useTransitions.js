import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  bin,
  bInterpolate,
  transformOrigin,
  useTimingTransition,
  useTransition
} from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";

const { multiply, interpolate, not } = Animated;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4
  }
});
const newOrigin = -(width / 2 - StyleGuide.spacing * 2);

export default () => {
  const [toggled, setToggle] = useState(false);
  const transition = useTransition(toggled, not(toggled), toggled);

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const rotate = multiply(
          (index - 1),
          interpolate(transition, {
            inputRange: [0, 1],
            outputRange: [0, Math.PI / 6],
          })
        );
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: [
                  { translateX: newOrigin },
                  { rotate },
                  { translateX: -newOrigin }
                ]
              }
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle(prev => !prev)}
      />
    </View>
  );
};
