import React, { useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { audioPlayerStyles } from './styles';
import { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TrackPlayer, { Capability, RepeatMode, State, useProgress, useIsPlaying, AppKilledPlaybackBehavior } from 'react-native-track-player';
import { ProgressBar } from '../../../../components/progress-bar';
import { AudioBars } from '../../../../components/audio-bars/audio-bars';
import { useNavigation } from '@react-navigation/native';
import { ENUM_SCREENS_NAMES } from '../../../../constants';
import { NavigationProps } from '../../../../interfaces';

interface AudioPlayerProps {
    url: string;
}

export const AudioPlayer = ({ url }: AudioPlayerProps) => {
  const { navigate } = useNavigation<NavigationProps>();
  const normalizedUrl = url || '';
  const hasErrorInUrl = !normalizedUrl || normalizedUrl.length === 0;
  const [hasError, setHasError] = useState<boolean>(hasErrorInUrl);
  const isPlaying = useIsPlaying().playing;

  const currentIconText = hasError ? 'alert-triangle' : isPlaying ? 'stop-circle' : 'play-circle';
  const textFeedback = hasError ? 'Nenhum som disponível!' : isPlaying ? 'Tocando som...' : 'Som pausado...';

  const track = useMemo(() => ({
    url: normalizedUrl,
    artwork: require('../../../../assets/images/icon.jpg'),
    title: `${normalizedUrl.slice(0, Math.ceil(normalizedUrl.length * 0.5))}...`,
  }), [normalizedUrl]);

  const progress = useProgress();

  const handleSetup = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
    });
  };

  const handleSound = async () => {
    try {
      const { state } = await TrackPlayer.getPlaybackState();

      if(state === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.load(track);
        await TrackPlayer.play();
      }

      setHasError(false);
    } catch (error) {
      setHasError(true);
    }
  };

  const handlePlayerWithError = async () => {
    if(!hasError) {return;}
    await TrackPlayer.pause();
  };

  const handleGoToListLinksScreen = () => {
    navigate(ENUM_SCREENS_NAMES.LIST_LINKS);
  };

  useEffect(() => {
    handleSetup();
  }, []);

  useEffect(() => {
    if(hasErrorInUrl) {
      setHasError(true);
      return;
    }

    setHasError(false);
  }, [hasErrorInUrl]);

  useEffect(() => {
    handlePlayerWithError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError]);

  return  <View style={audioPlayerStyles.container}>
              {
                isPlaying && <View style={audioPlayerStyles.bars}><AudioBars playing /></View>
              }
              <View style={audioPlayerStyles.row}>
                <TouchableOpacity style={audioPlayerStyles.controller} onPress={handleSound} >
                  <Feather name={currentIconText} size={40} color="black" />
                  <Text style={audioPlayerStyles.textFeedback}>{textFeedback}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={audioPlayerStyles.btnListLinks} onPress={handleGoToListLinksScreen} >
                  <Feather name="heart" size={30} color="black" />
                </TouchableOpacity>
              </View>
              {
                !hasError && <ProgressBar max={progress.duration} current={isPlaying ? progress.position : 0} />
              }
          </View>;
};
