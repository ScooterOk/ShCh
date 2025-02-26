'use client';
import React, { Suspense, useContext, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import HomeHeroTitle from '@/components/Home/HomeHeroTitle';
import HomeHeroLoopVideo from '@/components/Home/HomeHeroLoopVideo';
import HomeHeroVideoPlayer from '@/components/Home/HomeHeroVideoPlayer';
import HomeHeroName from '@/components/Home/HomeHeroName';
import HomeHeroText from '@/components/Home/HomeHeroText';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import HomeHeroTitleMobile from '@/components/Home/HomeHeroTitleMobile';
import useMobile from '@/hooks/useMobile';

import styles from './Hero.module.scss';
import { mainContext } from '@/providers/MainProvider';

const Hero = () => {
  const [initMousePosition, setInitMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const canvas = useRef();

  const { isMobile } = useMobile();

  const { loadedVideos } = useContext(mainContext);

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.hero__grid}>
          <div className={styles.hero__profile}>
            <HomeHeroLoopVideo styles={styles} />
            <HomeHeroName styles={styles} />
          </div>
          <HomeHeroVideoPlayer
            styles={styles}
            setShowVideoPlayer={setShowVideoPlayer}
            setInitMousePosition={setInitMousePosition}
          />

          <div className={styles.hero__title}>
            <Canvas
              ref={canvas}
              camera={{ position: [0, 0, 1], orthographic: true }}
              gl={{ stencil: true }}
            >
              <Suspense fallback={null}>
                <group scale={isMobile ? 0 : 1}>
                  {loadedVideos?.['/models/home_hero_title.gltf'] && (
                    <HomeHeroTitle />
                  )}
                </group>
                <group scale={isMobile ? 1 : 0}>
                  {loadedVideos?.['/models/home_hero_title_mobile.gltf'] && (
                    <HomeHeroTitleMobile />
                  )}
                </group>
              </Suspense>
            </Canvas>
            <HomeHeroText styles={styles} />
          </div>
        </div>
      </div>
      <VideoPlayerModal
        show={showVideoPlayer}
        onClose={() => setShowVideoPlayer(false)}
        initMousePosition={initMousePosition}
      />
    </>
  );
};

export default Hero;
