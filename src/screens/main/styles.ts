import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 100,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        gap: 20,
        height: 500,
    },
    infos: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 700,
        color: 'black',
    },
    subTilte: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 500,
        color: 'black',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 30,
    },
    input: {
        height: 50,
        width: '90%',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'black',
    },
    appButtonContainer: {
        width: '90%',
        elevation: 8,
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    appButtonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
  });
