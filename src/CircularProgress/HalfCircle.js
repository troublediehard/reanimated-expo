import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default ({ color, r }) => {
  return (
    <View
      style={{
        width: r * 2,
        height: r,
        overflow: "hidden"
      }}
    >
      <Animated.View
        style={{
          backgroundColor: color,
          width: r * 2,
          height: r * 2,
          borderRadius: r
        }}
      />
    </View>
  );
};
