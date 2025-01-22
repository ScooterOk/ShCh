import React, { Suspense, useRef } from 'react';

import styles from './AllWorks.module.scss';
import { Canvas } from '@react-three/fiber';
import HomeAllWorksTitle from '@/components/Home/HomeAllWorksTitle';

const AllWorks = () => {
  const container = useRef();

  return (
    <div className={styles.allworks} ref={container}>
      <div className={styles.allworks__title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          //   gl={{ stencil: true }}
        >
          <Suspense fallback={null}>
            <HomeAllWorksTitle container={container.current} />
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default AllWorks;
