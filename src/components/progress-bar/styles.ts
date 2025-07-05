import { StyleSheet, ViewStyle } from 'react-native';

export const progressBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 5,
        backgroundColor: '#9c9c9c',
        borderRadius: 10,
    },
});

export const barStyle = (width: number): ViewStyle => ({
    width: `${width}%`,
    height: '100%',
    backgroundColor: 'blue',
    borderRadius: 10,
});
