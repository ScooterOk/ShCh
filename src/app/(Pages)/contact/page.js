'use client';
import React, { useContext, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';

import { mainContext } from '@/providers/MainProvider';

import styles from './page.module.scss';

const medialist = ['/models/lets.gltf', '/video/audio_hover.mp3'];

const Contact = () => {
  const {
    isLoaded,
    setIsNavigationReady,
    setCurrentDescriptionSlide,
    resetMainProviderData,
  } = useContext(mainContext);

  useEffect(() => {
    return () => resetMainProviderData();
  }, [resetMainProviderData, setCurrentDescriptionSlide]);

  useGSAP(() => {
    gsap.timeline({ delay: 3 }).add(() => setIsNavigationReady(true));
  });

  return (
    <>
      <main className={styles.contact}>
        <Footer titleColor={'#9b9b88'} />
        {!isLoaded && <Loader medialist={medialist} theme="dark" />}
      </main>
    </>
  );
};

export default Contact;
