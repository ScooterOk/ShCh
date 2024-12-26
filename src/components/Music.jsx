'use client';
import React, { useContext, useEffect, useRef } from 'react';
import SoundButton from './SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

let audioContext;
let lowPassFilter;

let filter = {
  value: 10000,
};

const Music = () => {
  const { isLoaded, isHolded, isMuted, setIsMuted } = useContext(mainContext);
  const audioRef = useRef();
  useGSAP(
    () => {
      if (isLoaded) {
        document.addEventListener(
          'click',
          (e) => {
            audioContext = new (window.AudioContext ||
              window.webkitAudioContext)();
            const track = audioContext.createMediaElementSource(
              audioRef.current
            );
            lowPassFilter = audioContext.createBiquadFilter();
            lowPassFilter.type = 'lowpass';
            lowPassFilter.frequency.value = 20000;
            track.connect(lowPassFilter).connect(audioContext.destination);
            audioContext.resume();
            gsap.fromTo(
              audioRef.current,
              { volume: 0 },
              {
                volume: 1,
                duration: 10,
                onStart: () => {
                  audioRef.current.play();
                  setIsMuted(false);
                },
              }
            );
          },
          { once: true }
        );
      }
    },
    { dependencies: [isLoaded] }
  );

  useEffect(() => {
    if (!audioContext) return;
    gsap.to(audioRef.current, {
      volume: isMuted ? 0 : 1,
      duration: 1,
      overwrite: true,
      onStart: () => {
        if (!isMuted) audioRef.current.play();
      },
      onComplete: () => {
        if (isMuted) audioRef.current.pause();
      },
    });
  }, [isMuted]);

  useEffect(() => {
    if (lowPassFilter) {
      gsap.to(filter, {
        value: isHolded ? 300 : 10000,
        duration: 1,
        ease: isHolded ? 'power2.out' : 'power2.in',
        onUpdate: () => {
          lowPassFilter?.frequency?.setValueAtTime(filter.value, 0);
        },
      });
    }
  }, [isHolded]);

  const handleClick = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <SoundButton
        color="#9b9b88"
        active={!isMuted}
        handleClick={handleClick}
      />
      <audio
        id="background-song"
        ref={audioRef}
        preload="true"
        src="/C_6_M_Cinematic.wav"
      />
    </>
  );
};

export default Music;
