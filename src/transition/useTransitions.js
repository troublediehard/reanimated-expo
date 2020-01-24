import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {
  bInterpolate,
  transformOrigin,
  useTimingTransition
} from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";

const { multiply, interpolate } = Animated;
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

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,

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
