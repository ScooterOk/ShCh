'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import SoundButton from './SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useMobile from '@/hooks/useMobile';

let audioContext;
let lowPassFilter;

let filter = {
  value: 10000,
};

let params = {
  color: '#9b9b88',
};

const Music = () => {
  const [color, setColor] = useState(params.color);
  const { isLoaded, isHolded, isMuted, setIsMuted } = useContext(mainContext);
  const audioRef = useRef();

  const { isMobile } = useMobile();

  useGSAP(
    () => {
      if (isLoaded) {
        audioRef.current.volume = 0;
        document.addEventListener(
          'click',
          () => {
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
            if (!isMobile) {
              gsap.to(audioRef.current, {
                volume: 1,
                duration: 10,
                onStart: () => {
                  // audioRef.current.play();
                  setIsMuted(false);
                },
              });
            }
          },
          { once: true }
        );
      }
    },
    { dependencies: [isLoaded] }
  );

  useEffect(() => {
    gsap.to(audioRef.current, {
      volume: isMuted ? 0 : 1,
      duration: 3,
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

  const handleHover = (e) => {
    if (e.type === 'mouseenter') {
      gsap.to(params, {
        color: '#000000',
        duration: 0.75,
        ease: 'power4.Out',
        onUpdate: () => {
          setColor(params.color);
        },
      });
    } else {
      gsap.to(params, {
        color: '#9b9b88',
        duration: 1,
        ease: 'power4.inOut',
        onUpdate: () => {
          setColor(params.color);
        },
      });
    }
  };

  return (
    <>
      <SoundButton
        color={color}
        active={!isMuted}
        handleClick={handleClick}
        handleHover={handleHover}
      />
      <audio
        id="background-song"
        ref={audioRef}
        loop="true"
        preload="true"
        src="/song_V2.mp3"
      />
    </>
  );
};

export default Music;
