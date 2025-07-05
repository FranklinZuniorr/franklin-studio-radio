import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { listLinksStyles } from './styles';
import { useHandleListLinksStorage } from '../../hooks/use-handle-list-links-storage';
import { Option } from './components/option';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interfaces';
import { RouteProp } from '@react-navigation/native';
import { ENUM_SCREENS_NAMES } from '../../constants';

interface ListLinksProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.LIST_LINKS>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.LIST_LINKS>
}

export const ListLinks = ({ navigation }: ListLinksProps) => {
    const { goBack } = navigation;
    const [urlInput, setUrlInput] = useState<string>('');

    const { add, links, remove } = useHandleListLinksStorage();

    const hasLinks = links.length > 0;

    const handleOnPressAddBtn = () => {
        add(urlInput);
        setUrlInput('');
    };

    return <ScrollView contentContainerStyle={listLinksStyles.container}>
                <View style={listLinksStyles.header}>
                    <View style={listLinksStyles.titleArea}>
                        <TouchableOpacity style={listLinksStyles.backBtn} onPress={goBack}>
                            <Feather name="arrow-left" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={listLinksStyles.title}>
                            Salve os seus links para usar posteriormente
                        </Text>
                    </View>
                    <TextInput
                    value={urlInput}
                    style={listLinksStyles.input}
                    onChangeText={text => setUrlInput(text)}
                    placeholder="Sua url..."
                    placeholderTextColor="black"
                    />
                    <TouchableOpacity
                    style={listLinksStyles.appButtonContainer}
                    onPress={handleOnPressAddBtn}
                    >
                        <Text style={listLinksStyles.appButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
                {
                    hasLinks ?
                    <View style={listLinksStyles.list}>
                        {
                            links.map(data => (
                                <Option
                                key={data.id}
                                link={data.link}
                                date={data.date}
                                id={data.id}
                                onRemove={remove}
                                />
                            ))
                        }
                    </View> :
                    <Text style={listLinksStyles.textNoneFeedback}>Nenhum link salvo!</Text>
                }
            </ScrollView>;
};
