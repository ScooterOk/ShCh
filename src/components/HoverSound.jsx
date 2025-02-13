import { mainContext } from '@/providers/MainProvider';
import React, { useContext } from 'react';

const HoverSound = () => {
  const { loadedVideos } = useContext(mainContext);

  if (!loadedVideos['/video/audio_hover.mp3']) return null;

  return (
    <audio
      id="hover-sound"
      preload="true"
      src={loadedVideos['/video/audio_hover.mp3']}
    />
  );
};

export default HoverSound;
