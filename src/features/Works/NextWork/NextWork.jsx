'use client';
import React, { Suspense, useContext, useRef, useState } from 'react';
import styles from './NextWork.module.scss';
import { Canvas } from '@react-three/fiber';

import NextWorkTitle from '@/components/Works/NextWorkTitle';
import { mainContext } from '@/providers/MainProvider';
import Link from 'next/link';

const year = new Date().getFullYear();

const NextWork = () => {
  const [action, setAction] = useState();
  const { loadedMedia } = useContext(mainContext);

  const container = useRef();

  return (
    <div className={styles.next}>
      <div className={styles.wrapper}>
        <div className={styles.next__title}>
          <Link href="">
            <Canvas
              camera={{ position: [0, 0, 1], orthographic: true }}
              //   gl={{ stencil: true }}
            >
              <Suspense fallback={null}>
                {loadedMedia?.['/models/next_work.gltf'] && (
                  <NextWorkTitle
                    container={container.current}
                    setAction={setAction}
                  />
                )}
              </Suspense>
            </Canvas>
          </Link>
        </div>
        <div className={styles.next__video}>
          <video preload="auto" muted loop playsInline autoPlay>
            <source
              src={'/video/HEAVENSAKE/bg_preview_heavenSAKE.mp4'}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div className={styles.next__copyright}>©{year} Serhii Churilov</div>
    </div>
  );
};

export default NextWork;
