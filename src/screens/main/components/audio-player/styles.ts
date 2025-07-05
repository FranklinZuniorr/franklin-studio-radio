import { StyleSheet } from 'react-native';

export const audioPlayerStyles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#dedede',
        gap: 5,
    },
    bars: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -100,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    textFeedback: {
        fontWeight: 600,
        color: 'black',
    },
});
