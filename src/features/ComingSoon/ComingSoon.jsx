'use client';
import React, { Suspense, useContext, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CoubScene from '@/components/404/CoubScene';
import useMedia from '@/hooks/useMedia';
import { mainContext } from '@/providers/MainProvider';
import { useLenis } from 'lenis/react';

import styles from './ComingSoon.module.scss';

const medialist = [
  '/video/404/404_side_01.mp4',
  '/video/404/404_side_02.mp4',
  '/video/audio_hover.mp3',
];

const ComingSoon = () => {
  const { progress, isMediaListReady } = useMedia({
    list: medialist,
  });

  const lenis = useLenis();

  const { resetMainProviderData } = useContext(mainContext);

  useEffect(() => {
    lenis?.stop();
    return () => resetMainProviderData();
  }, [resetMainProviderData, lenis]);

  console.log('progress', progress);

  return (
    <main className={styles.comingSoon}>
      <div className={styles.text}>
        <div className={styles.text__left}>
          Serhii Churilov
          <br />
          Portfolio
        </div>
        <div className={styles.text__right}>
          Coming
          <br />
          Soon
        </div>
      </div>
      <div className={styles.canvas}>
        {(progress === 100 || isMediaListReady) && (
          <Canvas shadows>
            <color attach="background" args={['#000000']} />
            <PerspectiveCamera makeDefault position={[0, 0.1, 6.5]} />
            <ambientLight intensity={4} />
            <Suspense fallback={null}>
              <CoubScene />
            </Suspense>
          </Canvas>
        )}
      </div>
    </main>
  );
};

export default ComingSoon;
