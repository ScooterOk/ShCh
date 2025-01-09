'use client';
import React, { useContext, useRef } from 'react';
import { mainContext } from '@/providers/MainProvider';
import Loader from '@/components/Loader/Loader';
import Hero from '@/features/About/Hero/Hero';
import Description from '@/features/About/Description/Description';

import Recognition from '@/features/About/Recognition/Recognition';
import Footer from '@/components/Footer/Footer';

import styles from './page.module.scss';

const videolist = ['/video/hero_head_video_full.mp4'];

const About = () => {
  const { isLoaded } = useContext(mainContext);
  const mainContainerRef = useRef();

  return (
    <main ref={mainContainerRef} className={styles.about}>
      <Hero />
      <Description />
      <Recognition />
      <Footer className={styles.footer} />
      {!isLoaded && <Loader videolist={videolist} theme="dark" />}
    </main>
  );
};

export default About;
