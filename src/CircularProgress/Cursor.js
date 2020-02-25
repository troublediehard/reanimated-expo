import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { canvas2Polar, polar2Canvas } from 'react-native-redash';
import { StyleGuide, withOffset } from '../components';
// import { onGestureEvent } from 'react-native-redash';

const {
  Value,
  event,
  useCode,
  set,
} = Animated;

export default ({ size, r, theta }) => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);

  const onGestureEvent = event([{
    nativeEvent: {
      state,
      translationX,
      translationY,
    }
  }]);

  const x = withOffset({ value: translationX, state });
  const y = withOffset({ value: translationY, state });

  const center = { x: r, y: r };
  const polar = canvas2Polar({ x, y }, { x: r, y: r });
  const { x: translateX, y: translateY } = polar2Canvas({ theta: polar.theta, radius: r }, center);

  useCode(
    () => set(theta, polar.theta),
    []
  );

  return (
    <PanGestureHandler
      onHandlerStateChange={onGestureEvent}
      {...{onGestureEvent}}
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: 'white',
          borderWidth: 4,
          backgroundColor: StyleGuide.palette.primary,
          transform: [{translateX}, {translateY}]
        }}
      />
    </PanGestureHandler>
  )
}
