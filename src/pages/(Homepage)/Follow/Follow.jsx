import React, { Suspense, useRef } from 'react';

import styles from './Follow.module.scss';
import HomeFollowTitle from '@/components/(Home)/HomeFollowTitle';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, useHelper } from '@react-three/drei';
import { DirectionalLightHelper, SpotLightHelper } from 'three';
import Backgrounds from '@/components/(Home)/Follow/Backgrounds';

const Lights = () => {
  //   const lightRef = useRef();
  //   useHelper(lightRef, SpotLightHelper, 'red');
  return (
    // <directionalLight
    //   ref={lightRef}
    //   position={[0, 0, 10]}
    //   intensity={0.075}
    //   color={'#9b9b88'}
    // />
    <spotLight
      position={[0, 0, 5]}
      //   ref={lightRef}
      intensity={1.7}
      color={'#9b9b88'}
    />
  );
};

const Follow = () => {
  return (
    <div className={styles.follow}>
      <Backgrounds styles={styles} />
      <div className={styles.title}>
        <Canvas
          camera={{ position: [0, 0, 1], orthographic: true }}
          gl={{ stencil: true }}
        >
          <ambientLight intensity={50} color={'#9b9b88'} />

          <Lights />

          <Suspense fallback={null}>
            <HomeFollowTitle />
          </Suspense>
          {/* <Grid
            position={[0, 0, 0]}
            sectionSize={1}
            sectionColor={'white'}
            args={[10, 10]}
            cellSize={0.1}
            cellColor={'#ccc'}
          />
          <OrbitControls /> */}
        </Canvas>
        <div className={styles.title__description}>
          and check my work in progress,
          <br />
          explorations, experimentations
        </div>
      </div>
      <div className={styles.list}>
        <a href="/" target="_blank">
          Instagram
        </a>
        <a href="/" target="_blank">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Follow;
