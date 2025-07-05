/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { mainStyles } from './styles';
import { useState } from 'react';
import { AudioPlayer } from './components/audio-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Main = () => {
    const [url, setUrl] = useState<string>('');

    const verifyLastSavedUrl = async () => {
        const savedUrl = await AsyncStorage.getItem('url');

        if (!savedUrl) {
            return;
        }

        setUrl(savedUrl);
    };

    const handleOnChangeText = async (text: string) => {
        setUrl(text);
        await AsyncStorage.setItem('url', text);
    };

    useEffect(() => {
        verifyLastSavedUrl();
    }, []);

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
