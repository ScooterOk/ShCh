export const handleHoverSound = () => {
  // Play hover sound
  const hoverSound = document.getElementById('hover-sound');
  hoverSound.currentTime = 0;
  hoverSound.play();
};

export const createVideo = (src, options) => {
  const { loop = true, muted = true, autoPlay = true } = options || {};
  const video = document.createElement('video');
  video.src = src;
  video.crossOrigin = 'anonymous';
  video.loop = loop;
  video.muted = muted;
  video.playsInline = true;
  if (autoPlay) video.play();
  return video;
};
