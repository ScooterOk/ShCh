'use client';
import React, { Suspense, useRef, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import HomeHeroTitle from '@/components/(Home)/HomeHeroTitle';
import HomeHeroLoopVideo from '@/components/(Home)/HomeHeroLoopVideo';

import HomeHeroVideoPlayer from '@/components/(Home)/HomeHeroVideoPlayer';
import HomeHeroName from '@/components/(Home)/HomeHeroName';

import HomeHeroText from '@/components/(Home)/HomeHeroText';

import styles from './Hero.module.scss';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useLenis } from 'lenis/react';

const Hero = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const canvas = useRef();

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.hero__videos}>
          <Suspense fallback={null}>
            <HomeHeroLoopVideo styles={styles} />
            <HomeHeroVideoPlayer
              styles={styles}
              setShowVideoPlayer={setShowVideoPlayer}
            />
            <HomeHeroName styles={styles} />
          </Suspense>
        </div>
        <div className={styles.hero__title}>
          <Canvas
            ref={canvas}
            camera={{ position: [0, 0, 1], orthographic: true }}
            gl={{ stencil: true }}
          >
            <Suspense fallback={null}>
              <HomeHeroTitle />
            </Suspense>
          </Canvas>
          <HomeHeroText styles={styles} />
        </div>
      </div>
      <VideoPlayerModal
        show={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
      />
    </>
  );
};

export default Hero;
