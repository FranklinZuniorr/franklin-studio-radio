import React from 'react';
import { View } from 'react-native';
import { barStyle, progressBarStyles } from './styles';

interface ProgressBarProps {
    max: number;
    current: number;
}

export const ProgressBar = ({ current, max }: ProgressBarProps) => {
    const normalizedMax = max < 1 ? 1 : max;
    const percentage = (current / normalizedMax) * 100;
    const normalizedPercentage = percentage > 100 ? 100 : percentage;
    return <View style={progressBarStyles.container}>
        <View style={barStyle(normalizedPercentage)} />
    </View>;
};
