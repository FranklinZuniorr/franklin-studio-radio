/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { View, Animated, LayoutChangeEvent } from 'react-native';
import { audioBarsStyles } from './styles';

interface AudioBarsProps {
  playing: boolean;
}

export const AudioBars = ({ playing }: AudioBarsProps ) => {
  const [width, setWidth] = useState<number>(0);
  const normalizedWidth = Math.ceil(width / 10);

  const [animatedValues, setAnimatedValues ] = useState<Animated.Value[]>([]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  };

  useEffect(() => {
    const animateBar = (bar: Animated.Value) => {
      if (!playing) {return;}

      Animated.sequence([
        Animated.timing(bar, {
          toValue: Math.random() * 100,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(bar, {
          toValue: 10,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    };

    const interval = setInterval(() => {
      if (playing) {
        animatedValues.forEach((bar) => animateBar(bar));
      } else {
        animatedValues.forEach((bar) => bar.setValue(10));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [animatedValues, playing]);

  useEffect(() => {
    setAnimatedValues([...Array(normalizedWidth)].map(() => new Animated.Value(0)));
  }, [normalizedWidth]);

  return (
    <View onLayout={handleLayout} style={audioBarsStyles.container}>
      {animatedValues.map((bar, index) => (
        <Animated.View
          key={index}
          style={[audioBarsStyles.bar, { height: bar }]}
        />
      ))}
    </View>
  );
};
