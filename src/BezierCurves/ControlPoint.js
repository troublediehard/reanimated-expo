import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { StyleGuide, withOffset } from '../components';

const {
  Value,
  event,
  set,
  block,
  useCode,
  sub,
  diffClamp,
} = Animated;

export default ({ point, min, max }) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        translationY,
        state,
      }
    }
  ]);

  const x = withOffset({ value: translationX, state });
  const y = withOffset({ value: translationY, state });
  const translateX = diffClamp(x, min, max);
  const translateY = diffClamp(y, min, max);

  useCode(
    () => block([
      set(point.x, translateX),
      set(point.y, translateY),
    ]),
    []
  );

  return (
    <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{onGestureEvent}}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: StyleGuide.palette.primary,
          borderWidth: 4,
          borderColor: 'black',
          transform: [{translateX: sub(translateX, 15)}, {translateY: sub(translateY, 15)}]
        }}
      />
    </PanGestureHandler>
  );
}
