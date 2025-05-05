import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { GameContext } from '../App';

export default function ClickerObject() {
  const { setScore, updateTaskProgress } = useContext(GameContext);
  const [doubleTapCount, setDoubleTapCount] = useState(0);

  // Animation states
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const originalScale = useSharedValue(1);

  // Tap handler
  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScore((prev) => {
        const newScore = prev + 1;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
      updateTaskProgress('1', 1);
    }
  };

  // Double tap handler
  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScore((prev) => {
        const newScore = prev + 2;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
      updateTaskProgress('2', 1);
    }
  };

  // Long press handler
  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setScore((prev) => {
        const newScore = prev + 5;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
      updateTaskProgress('3', 1);
    }
  };

  // Pan handler
  const onPanGesture = (event) => {
    translateX.value = event.nativeEvent.translationX;
    translateY.value = event.nativeEvent.translationY;
    if (event.nativeEvent.state === State.END) {
      updateTaskProgress('4', 1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  };

  // Fling handler for right swipe
  const onFlingRight = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Right swipe detected');
      const points = Math.floor(Math.random() * 10) + 1;
      setScore((prev) => {
        const newScore = prev + points;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
      updateTaskProgress('5', 1);
    }
  };

  // Fling handler for left swipe
  const onFlingLeft = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log('Left swipe detected');
      const points = Math.floor(Math.random() * 10) + 1;
      setScore((prev) => {
        const newScore = prev + points;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
      updateTaskProgress('6', 1);
    }
  };

  // Pinch handler
  const onPinchGesture = (event) => {
    scale.value = originalScale.value * event.nativeEvent.scale;
    if (event.nativeEvent.state === State.END) {
      updateTaskProgress('7', 1);
      originalScale.value = scale.value;
      setScore((prev) => {
        const newScore = prev + 10;
        updateTaskProgress('8', newScore - prev);
        return newScore;
      });
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <PinchGestureHandler onGestureEvent={onPinchGesture}>
      <Animated.View>
        <PanGestureHandler
          onGestureEvent={onPanGesture}
          simultaneousHandlers={['flingRight', 'flingLeft']}
        >
          <Animated.View>
            <FlingGestureHandler
              ref={(ref) => (this.flingRight = ref)}
              direction={1} // RIGHT
              onHandlerStateChange={onFlingRight}
              minDistance={50}
              minPointers={1}
              simultaneousHandlers={['pan', 'flingLeft']}
            >
              <FlingGestureHandler
                ref={(ref) => (this.flingLeft = ref)}
                direction={2} // LEFT
                onHandlerStateChange={onFlingLeft}
                minDistance={50}
                minPointers={1}
                simultaneousHandlers={['pan', 'flingRight']}
              >
                <Animated.View>
                  <LongPressGestureHandler
                    onHandlerStateChange={onLongPress}
                    minDurationMs={3000}
                  >
                    <Animated.View>
                      <TapGestureHandler
                        onHandlerStateChange={onSingleTap}
                        numberOfTaps={1}
                      >
                        <TapGestureHandler
                          onHandlerStateChange={onDoubleTap}
                          numberOfTaps={2}
                        >
                          <Animated.View style={[styles.object, animatedStyle]}>
                            <View style={styles.innerObject} />
                          </Animated.View>
                        </TapGestureHandler>
                      </TapGestureHandler>
                    </Animated.View>
                  </LongPressGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  object: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerObject: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
});