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
    date: Date;
    id: string;
    onRemove: (id: string) => void;
}

export const Option = ({ link, id, date, onRemove }: OptionProps) => {
    const { navigate } = useNavigation<NavigationProps>();

    const handleNavigateToMainScreen = () => {
        navigate(ENUM_SCREENS_NAMES.MAIN, { url: link });
    };

    const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

    return <View style={optionStyles.container}>
                <TouchableOpacity style={optionStyles.areaText} onPress={handleNavigateToMainScreen}>
                    <Text style={optionStyles.text}>{limitText(20, link)}</Text>
                    <Text style={optionStyles.subText}>{link}</Text>
                    <Text style={optionStyles.subText}>{formattedDate}</Text>
                </TouchableOpacity>
                <View style={optionStyles.actionsArea}>
                    <TouchableOpacity style={optionStyles.btn} onPress={handleNavigateToMainScreen}>
                        <Feather name="play" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={optionStyles.btn} onPress={() => onRemove(id)}>
                        <Feather name="trash" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>;
};
