'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import SoundButton from './SoundButton/SoundButton';
import { mainContext } from '@/providers/MainProvider';
import { folder, useControls } from 'leva';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

let audioContext;
let lowPassFilter;

let scooterok = {
  value: 10000,
};

const Music = () => {
  const { isLoaded, isHolded } = useContext(mainContext);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef();

  // useGSAP(
  //   () => {
  //     if (isLoaded) {
  //       document.addEventListener(
  //         'click',
  //         () => {
  //           audioContext = new (window.AudioContext ||
  //             window.webkitAudioContext)();
  //           const track = audioContext.createMediaElementSource(
  //             audioRef.current
  //           );
  //           lowPassFilter = audioContext.createBiquadFilter();
  //           lowPassFilter.type = 'lowpass';
  //           lowPassFilter.frequency.value = 20000;
  //           track.connect(lowPassFilter).connect(audioContext.destination);
  //           console.log('audioContext', audioContext);
  //           audioContext.resume();
  //           gsap.fromTo(
  //             audioRef.current,
  //             { volume: 0 },
  //             {
  //               volume: 1,
  //               duration: 10,
  //               onStart: () => {
  //                 audioRef.current.play();
  //                 setIsMuted(false);
  //               },
  //             }
  //           );
  //         },
  //         { once: true }
  //       );
  //     }
  //   },
  //   { dependencies: [isLoaded] }
  // );

  useEffect(() => {
    if (lowPassFilter) {
      gsap.to(scooterok, {
        value: isHolded ? 300 : 10000,
        duration: 1,
        ease: isHolded ? 'power2.out' : 'power2.in',
        onUpdate: () => {
          lowPassFilter?.frequency?.setValueAtTime(scooterok.value, 0);
        },
      });
    }
  }, [isHolded]);

  // useEffect(() => {
  //   if (lowPassFilter.current) {
  //     console.log('isHolded', isHolded);
  //     gsap.to(lowPassFilter.current.frequency, {
  //       value: isHolded ? 300 : 20000,
  //       duration: 4,
  //       overwrite: true,
  //       ease: 'none',
  //     });
  //   }
  // }, [isHolded]);

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
      <audio ref={audioRef} src="/C_6_M_Cinematic.wav" />
    </>
  );
};

export default Music;
