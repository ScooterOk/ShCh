'use client';
import React, { useContext, useRef } from 'react';

import styles from './page.module.scss';
import { mainContext } from '@/providers/MainProvider';
import Loader from '@/components/Loader/Loader';
import Hero from '@/features/About/Hero/Hero';

const videolist = ['/video/hero_head_video_full.mp4'];

const About = () => {
  const { isLoaded } = useContext(mainContext);
  const mainContainerRef = useRef();

  return (
    <main ref={mainContainerRef} className={styles.about}>
      <Hero />
      {!isLoaded && <Loader videolist={videolist} theme="dark" />}
    </main>
  );
};

export default About;
