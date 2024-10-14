import React, { Suspense } from 'react';

import styles from './FocusOn.module.scss';
import { Canvas } from '@react-three/fiber';
import {
  Grid,
  OrbitControls,
  PerspectiveCamera,
  useVideoTexture,
} from '@react-three/drei';
import CoubScene from '@/components/(Home)/CoubScene';

const FocusOn = () => {
  return (
    <div className={styles.focus}>
      <Canvas shadows>
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera makeDefault position={[-6, 0, 0]} />
        <ambientLight color={'#404040'} />
        {/* <Grid
          position={[0, 0, 0]}
          sectionSize={1}
          sectionColor={'white'}
          args={[10, 10]}
          cellSize={0.1}
          cellColor={'#ccc'}
        /> */}
        <OrbitControls />
        <Suspense fallback={null}>
          <CoubScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FocusOn;
