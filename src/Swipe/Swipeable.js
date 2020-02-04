import * as React from "react";
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated  from 'react-native-reanimated';
import { onGestureEvent, min } from 'react-native-redash';

const {
  Clock,
  Value,
  diffClamp,
  cond,
  set,
  eq,
  add,
  decay,
  clockRunning,
  startClock,
  stopClock,
  block,
  and,
  not,
  neq,
  spring,
  SpringUtils,
  useCode,
  abs,
  multiply,
  sub,
  call,
  log,
  interpolate,
  Extrapolate,
  debug
} = Animated;


const snapPoint = (snapPoints, value, velocity) => {
  const point = add(value, multiply(velocity, 0.2));
  const deltas = snapPoints.map(p => abs(sub(point, p)));
  const minDelta = min(...deltas);
  const closestPoint = interpolate(minDelta, {
    inputRange: deltas,
    outputRange: snapPoints,
    // extrapolate: Extrapolate.CLAMP,
  });
  return closestPoint;

  // debug('deltas', deltas);
  //
  //
  // return snapPoints.reduce(
  //   (acc, p) => cond(eq(abs(sub(point, p)), minDelta), p, acc),
  //   new Value()
  // );
};

const withSpring = (
  value,
  velocity,
  gestureState,
  snapPoints,
  onSnap,
  offset = new Value(0),
) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };
  const config = {
    ...SpringUtils.makeDefaultConfig(),
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
  };
  const gestureAndAnimationIsOver = new Value(1);

  const isDecayInterrupted = and(
    eq(gestureState, State.BEGAN),
    clockRunning(clock)
  );
  const finishDecay = [
    set(offset, state.position),
    stopClock(clock),
    set(gestureAndAnimationIsOver, 1)
  ];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(gestureAndAnimationIsOver, set(state.position, offset)),
    cond(
      and(eq(gestureState, State.END), not(gestureAndAnimationIsOver)),
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.velocity, velocity),
          set(state.time, 0),
          set(config.toValue, snapPoint(snapPoints, state.position, velocity)),
          startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, [
          set(gestureAndAnimationIsOver, 1),
          onSnap && [cond(clockRunning(clock), call([state.position], onSnap), [])],
          ...finishDecay
        ])
      ]
    ),
    cond(
      neq(gestureState, State.END),
      [
        set(gestureAndAnimationIsOver, 0),
        set(state.finished, 0),
        set(state.position, add(offset, value))
      ]
    ),
    state.position
  ]);
};

export default ({ translateX, translateY, snapPoints, onSnap, offsetX }) => {
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    state
  });

  const x = withSpring(translationX, velocityX, state, snapPoints, onSnap, offsetX);
  const y = withSpring(translationY, velocityY, state, snapPoints, onSnap);

  useCode(
    () => block([
      set(translateX, x),
      set(translateY, y),
    ]),
    []
  );


  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={{...StyleSheet.absoluteFill}} />
    </PanGestureHandler>
  );
};
