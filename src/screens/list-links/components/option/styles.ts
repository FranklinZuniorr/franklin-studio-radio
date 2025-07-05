import { StyleSheet } from 'react-native';

export const optionStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
        gap: 5,
    },
    text: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
    },
    btnDelete: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
    },
});
