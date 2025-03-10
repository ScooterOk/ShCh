import { mainContext } from '@/providers/MainProvider';
import React, { useContext } from 'react';

const HoverSound = () => {
  const { loadedMedia } = useContext(mainContext);

  if (!loadedMedia['/video/audio_hover.mp3']) return null;

  return (
    <audio
      id="hover-sound"
      preload="true"
      src={loadedMedia['/video/audio_hover.mp3']}
    />
  );
};

export default HoverSound;
