import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { optionStyles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import { limitText } from '../../../../utils';
import { NavigationProps } from '../../../../interfaces';
import { useNavigation } from '@react-navigation/native';
import { ENUM_SCREENS_NAMES } from '../../../../constants';

interface OptionProps {
    link: string;
    id: string;
    onRemove: (id: string) => void;
}

export const Option = ({ link, id, onRemove }: OptionProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const handleNavigateToMainScreen = () => {
        navigate(ENUM_SCREENS_NAMES.MAIN, { url: link });
    };

    return <View style={optionStyles.container}>
                <TouchableOpacity onPress={handleNavigateToMainScreen}>
                    <Text style={optionStyles.text}>{limitText(20, link)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={optionStyles.btnDelete} onPress={() => onRemove(id)}>
                    <Feather name="trash" size={30} color="black" />
                </TouchableOpacity>
            </View>;
};
