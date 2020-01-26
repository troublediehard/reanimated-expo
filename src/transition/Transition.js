import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import StyleGuide from './style';
import { FlexibleCard, cards } from '../components/Card';
import Selection from '../components/Selection';

const { height, width } = Dimensions.get('window');

const {
  Value,

} = Animated;
const duration = 2000;

const layouts = [
  {
    id: "column",
    name: "Column",
    layout: {
      container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  },
  {
    id: "row",
    name: "Row",
    layout: {
      container: {
        flexDirection: "row",
        alignItems: "center"
      }
    }
  },
  {
    id: "wrap",
    name: "Wrap",
    layout: {
      container: {
        flexDirection: "row",
        flexWrap: "wrap"
      },
      child: {
        flex: 0,
        width: width / 2 - StyleGuide.spacing * 2
      }
    }
  }
];

const transition = <Transition.Change durationMs={2400} interpolation="easeInOut" />;

export const TransitionLayout = () => {
  const ref = useRef(null);
  const [selectedLayout, setLayout] = useState(layouts[0].layout);

  return (
    <>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={[styles.container, selectedLayout.container]}
      >
        {cards.map(card => (
          <FlexibleCard
            key={card.id}
            style={selectedLayout.child}
            {...{ card }}
          />
        ))}
      </Transitioning.View>
      {layouts.map(layout => (
        <Selection
          key={layout.id}
          name={layout.name}
          isSelected={layout.layout === selectedLayout}
          onPress={() => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setLayout(layout.layout);
          }}
        />
      ))

      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background
  },
  image: {
    height,
    width,
  },
});
