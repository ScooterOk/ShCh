import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import HomeWorksTitle from '@/components/(Home)/HomeWorksTitle';
import Koenigsegg from '@/components/(Home)/Works/Koenigsegg';

import styles from './Works.module.scss';
import Skyrocket from '@/components/(Home)/Works/Skyrocket';
import AngleSparky from '@/components/(Home)/Works/AngleSparky';
import Mesmerized from '@/components/(Home)/Works/Mesmerized';

const Works = () => {
  return (
    <div className={styles.works}>
      <div className={styles.title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          //   gl={{ stencil: true }}
        >
          <Suspense fallback={null}>
            <HomeWorksTitle />
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <Koenigsegg styles={styles} />
      <Skyrocket styles={styles} />
      <AngleSparky styles={styles} />
      <Mesmerized styles={styles} />
    </div>
  );
};

export default Works;
