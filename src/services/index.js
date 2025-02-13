export const handleHoverSound = () => {
  // Play hover sound
  const hoverSound = document.getElementById('hover-sound');
  hoverSound.currentTime = 0;
  hoverSound.play();
};
