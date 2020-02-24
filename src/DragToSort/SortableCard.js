import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { panGestureHandler } from "react-native-redash";

import Card, {
  CardProps,
  CARD_HEIGHT as INNER_CARD_HEIGHT
} from "../components/Card";
import { withTransition } from '../components';

export const CARD_HEIGHT = INNER_CARD_HEIGHT + 32;
const { width } = Dimensions.get("window");
const {
  Value,
  eq,
  cond,
  useCode,
  divide,
  floor,
  max,
  multiply,
  block,
  set,
  diff,
  lessThan,
  add,
  greaterThan,
  abs,
  not
} = Animated;

const withSafeOffset = (value, state, offset) => {
  const safeOffset = new Value(0);

  return cond(
    eq(state, State.ACTIVE),
    add(safeOffset, value),
    [
      set(safeOffset, offset),
      safeOffset
    ]
  )
};

export default ({ card, index, offsets }) => {
  const { gestureHandler, translationX, velocityX, translationY, velocityY, state } = panGestureHandler();
  const x = withSafeOffset(translationX, state, 0);
  const y = withSafeOffset(translationY, state, offsets[index]);
  const currentOffset = multiply(max(floor(divide(add(y, CARD_HEIGHT / 2) , CARD_HEIGHT)), 0), CARD_HEIGHT);
  const translateX = withTransition(x, velocityX, state);
  const translateY = withTransition(y, velocityY, state);
  const zIndex = cond(eq(state, State.ACTIVE), 200, 1);

  useCode(
    () => block(
      offsets.map(_offset => cond(
        eq(_offset, currentOffset),
        [
          set(_offset, offsets[index]),
          set(offsets[index], currentOffset)
        ]
      ))
    ),
    [],
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: CARD_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateY }, { translateX }],
          zIndex
        }}
      >
        <Card {...{ card }} />
      </Animated.View>
    </PanGestureHandler>
  );
};
