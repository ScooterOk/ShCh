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

const Hero = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const canvas = useRef();

  return (
    <>
      <div className={styles.hero}>
        <Canvas
          ref={canvas}
          camera={{ position: [0, 0, 1], orthographic: true }}
          gl={{ stencil: true }}
        >
          {/* <ambientLight />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} />
        <Environment preset="sunset" /> */}
          {/* <Grid position={[0, 0, 0]} args={[2, 2]} cellSize={0.1} /> */}

          {/* <HomeHeroLoopVideo /> */}

          <Suspense fallback={null}>
            <HomeHeroTitle />
            {/* <HomeHeroScooterOk /> */}
          </Suspense>

          {/* <OrbitControls /> */}
        </Canvas>

        <Suspense fallback={null}>
          <HomeHeroVideoPlayer
            styles={styles}
            setShowVideoPlayer={setShowVideoPlayer}
          />
          <HomeHeroLoopVideo styles={styles} />
        </Suspense>
        <HomeHeroName styles={styles} />
        <HomeHeroText styles={styles} />

        {/* <Canvas shadows gl={{ stencil: true }}>
        <HomeHeroLoopVideo />
        <OrbitControls makeDefault />
      </Canvas> */}
      </div>
      <VideoPlayerModal
        show={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
      />
    </>
  );
};

export default Hero;
