import { StyleSheet } from 'react-native';

export const listLinksStyles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 20,
        alignItems: 'center',
        gap: 30,
    },
    header: {
        width: '100%',
        gap: 10,
    },
    titleArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 700,
        maxWidth: 250,
    },
    backBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
    },
    input: {
        height: 50,
        width: '100%',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'black',
    },
    appButtonContainer: {
        width: '100%',
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
    list: {
        width: '100%',
        gap: 10,
    },
    textNoneFeedback: {
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 700,
        maxWidth: 250,
    },
});
