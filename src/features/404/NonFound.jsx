'use client';
import Link from 'next/link';
import React, { Suspense, useContext, useEffect } from 'react';

import styles from './NonFound.module.scss';
import { IconArrowLeft } from '@/components/icons';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CoubScene from '@/components/404/CoubScene';
import useMedia from '@/hooks/useMedia';
import { mainContext } from '@/providers/MainProvider';
import Navigation from '@/components/Navigation/Navigation';
import TransitionAnimation from '@/components/TransitionAnimation/TransitionAnimation';

const medialist = [
  '/video/404/404_side_01.mp4',
  '/video/404/404_side_02.mp4',
  '/video/404/404_side_03.mp4',
  '/video/audio_hover.mp3',
];

const NonFound = () => {
  const { progress, isMediaListReady } = useMedia({
    list: medialist,
  });

  const { setIsNavigationReady, resetMainProviderData } =
    useContext(mainContext);

  useEffect(() => {
    setIsNavigationReady(true);
    return () => resetMainProviderData();
  }, [setIsNavigationReady, resetMainProviderData]);

  return (
    <main className={styles.notFound}>
      <Link href="/" className={styles.back}>
        <button className={styles.back__button}>
          <IconArrowLeft />
        </button>
        Back to Homepage
      </Link>
      <div className={styles.text}>
        <p>404 error </p>
        <p>page not found</p>
      </div>
      <div className={styles.canvas}>
        {(progress === 100 || isMediaListReady) && (
          <Canvas shadows>
            <color attach="background" args={['#000000']} />
            <PerspectiveCamera makeDefault position={[0, 0.1, 4.5]} />
            <ambientLight intensity={4} />
            <Suspense fallback={null}>
              <CoubScene />
            </Suspense>
          </Canvas>
        )}
      </div>
      <Navigation />
      <TransitionAnimation />
    </main>
  );
};

export default NonFound;
