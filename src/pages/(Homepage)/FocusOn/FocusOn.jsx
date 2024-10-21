import React, {
  forwardRef,
  Suspense,
  useCallback,
  useRef,
  useState,
} from 'react';

import styles from './FocusOn.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Grid,
  OrbitControls,
  PerspectiveCamera,
  useVideoTexture,
} from '@react-three/drei';
import CoubScene from '@/components/(Home)/CoubScene';
import { CameraHelper } from 'three';
import gsap from 'gsap';
import * as THREE from 'three';

const FocusOn = forwardRef((props, ref) => {
  const { currentSlide } = props;
  const [isHolded, setIsHolded] = useState(null);

  const cameraRef = useRef();

  // const handleTestSlide = () => {
  //   setCurrentSlide((prev) => (prev < 4 ? prev + 1 : 0));
  // };

  const handleClickAndHold = useCallback((e) => {
    return;

    if (e.type === 'pointerdown') {
      setIsHolded(true);
    }
    if (e.type === 'pointerup') {
      setIsHolded(false);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={styles.focus}
      onPointerDown={handleClickAndHold}
      onPointerUp={handleClickAndHold}
    >
      <div className={styles.content}>
        <h2 className={styles.content__title}>Focus On</h2>
        <div className={styles.content__breadcrumbs} data-active={currentSlide}>
          <span>Web Design/</span>
          <span>Brand Design/</span>
          <span>Motion Design/</span>
        </div>
        <ul className={styles.content__list}>
          <li>UX Design</li>
          <li>UI Design</li>
          <li>Art Direction</li>
        </ul>
      </div>
      <div className={styles.click_hold}>Click&Hold</div>

      <Canvas shadows>
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={2} />

        {/* <Grid
          position={[0, 0, 0]}
          sectionSize={1}
          sectionColor={'white'}
          args={[10, 10]}
          cellSize={0.1}
          cellColor={'#ccc'}
        /> */}
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <CoubScene
            cameraRef={cameraRef}
            currentSlide={currentSlide}
            isHolded={isHolded}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default FocusOn;
