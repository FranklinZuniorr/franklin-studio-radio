import { StyleSheet } from 'react-native';

export const audioBarsStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      width: '100%',
      height: 100,
      gap: 4,
    },
    bar: {
      width: 10,
      backgroundColor: 'blue',
      borderRadius: 2,
    },
  });
