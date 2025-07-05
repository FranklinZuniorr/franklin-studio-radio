import { StyleSheet } from 'react-native';

export const audioPlayerStyles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        backgroundColor: '#dedede',
        gap: 10,
    },
    bars: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -100,
    },
    controller: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    btnListLinks: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    textFeedback: {
        fontWeight: 600,
        color: 'black',
    },
});
