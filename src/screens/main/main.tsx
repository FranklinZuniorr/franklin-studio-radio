/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mainStyles } from './styles';
import { useState } from 'react';
import { AudioPlayer } from './components/audio-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../interfaces';
import { ENUM_SCREENS_NAMES } from '../../constants';
import { RouteProp } from '@react-navigation/native';

interface MainProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.MAIN>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.MAIN>
}

export const Main = ({ route  }: MainProps) => {
    const urlNavigationParams = route.params?.url;
    const [url, setUrl] = useState<string>(urlNavigationParams || '');

    const verifyLastSavedUrl = async () => {
        const savedUrl = await AsyncStorage.getItem('url');

        if (!savedUrl || !!urlNavigationParams) {
            return;
        }

        setUrl(savedUrl);
    };

    const handleOnChangeText = async (text: string) => {
        setUrl(text);
        await AsyncStorage.setItem('url', text);
    };

    const handleSaveUrlNavigationParams = useCallback(async () => {
        await AsyncStorage.setItem('url', urlNavigationParams);
    }, [urlNavigationParams]);

    useEffect(() => {
        verifyLastSavedUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSaveUrlNavigationParams();
    }, [handleSaveUrlNavigationParams]);

    return <SafeAreaView style={mainStyles.container}>
                <View style={mainStyles.content}>
                    <View style={mainStyles.infos}>
                        <Text style={mainStyles.title}>Franklin Studio Radio</Text>
                        <Text style={mainStyles.subTilte}>Conectando você ao som do agora — onde a vibe não para!</Text>
                    </View>
                    <Image style={mainStyles.image} source={require('../../assets/images/icon.jpg')}  />
                    <TextInput
                    style={mainStyles.input}
                    placeholder="Sua url..."
                    placeholderTextColor="black"
                    value={url}
                    onChangeText={text => handleOnChangeText(text)}
                    />
                    <TouchableOpacity
                    style={{...mainStyles.appButtonContainer, opacity: !url ? 0.5 : 1}}
                    disabled={!url}
                    onPress={() => handleOnChangeText('')}
                    >
                        <Text style={mainStyles.appButtonText}>Limpar campo</Text>
                    </TouchableOpacity>
                </View>
                <AudioPlayer url={url} />
            </SafeAreaView>;
};
