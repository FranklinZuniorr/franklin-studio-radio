import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { audioPlayerStyles } from './styles';
import { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TrackPlayer, { Capability, RepeatMode, State, useProgress, useIsPlaying, AppKilledPlaybackBehavior } from 'react-native-track-player';
import { ProgressBar } from '../../../../components/progress-bar';
import { AudioBars } from '../../../../components/audio-bars/audio-bars';

interface AudioPlayerProps {
    url: string;
}

export const AudioPlayer = ({ url }: AudioPlayerProps) => {
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

  const handleSetup = useCallback(async () => {
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
  }, []);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePlayerWithError = async () => {
    if(!hasError) {return;}
    await TrackPlayer.pause();
  };

  useEffect(() => {
    handleSetup();
  }, [handleSetup]);

  useEffect(() => {
    if(hasErrorInUrl) {
      setHasError(true);
      return;
    }

    setHasError(false);
  }, [hasErrorInUrl]);

  useEffect(() => {
    handlePlayerWithError();
  }, [handlePlayerWithError]);

  return <View style={audioPlayerStyles.container}>
      {
        isPlaying && <View style={audioPlayerStyles.bars}><AudioBars playing /></View>
      }
      <TouchableOpacity style={audioPlayerStyles.row} onPress={handleSound} >
        <Feather name={currentIconText} size={40} color="black" />
        <Text style={audioPlayerStyles.textFeedback}>{textFeedback}</Text>
      </TouchableOpacity>
      {
        !hasError && <ProgressBar max={progress.duration} current={isPlaying ? progress.position : 0} />
      }
  </View>;
};
