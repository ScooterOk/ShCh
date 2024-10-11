import React from 'react';

import styles from './FocusOn.module.scss';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import CoubScene from './CoubScene';

const FocusOn = () => {
  return (
    <div className={styles.focus}>
      <Canvas shadows>
        <color attach="background" args={['#21272e']} />
        <PerspectiveCamera makeDefault position={[3, 4, 5]} />
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
        <CoubScene />
      </Canvas>
    </div>
  );
};

export default FocusOn;
