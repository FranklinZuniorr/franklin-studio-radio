import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ENUM_SCREENS_NAMES } from '../constants';

export interface RootStackParamListMainScreenProps {
    url: string;
}

export type RootStackParamList = {
    [ENUM_SCREENS_NAMES.MAIN]: RootStackParamListMainScreenProps;
    [ENUM_SCREENS_NAMES.LIST_LINKS]: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
